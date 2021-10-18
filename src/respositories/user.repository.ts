import db from "../db";
import User from "../models/user.model";
import DatabaseError from "../models/error/database.error.model";


class UserRepository {

  async findAllUsers(): Promise<User[]> {
    const querySearch = `
      SELECT uuid, username
      FROM application_user
    `;

    const { rows } = await db.query<User>(querySearch);
    
    return rows || [];
  }

  async findById(uuid:string): Promise<User> {
   try{ const querySearch = `
      SELECT uuid, username
      FROM application_user
      WHERE uuid = $1
    `;
    const values = [uuid];

    const { rows } = await db.query<User>(querySearch, values);
    const [ user ] = rows;

    return user;
  } catch(err){
     throw new DatabaseError('Could not find user', err)
    }
  }

  async create(user:User): Promise<string> {
    const script = `
      INSERT INTO application_user(
        username,
        password
      )
      VALUES($1, crypt($2, gen_salt('bf')))
      RETURNING uuid
    `;

    const values = [ user.username, user.password ];

    const { rows } = await db.query<{uuid: string}>(script, values);
    const [newUser] = rows;

    return newUser.uuid;
  }

  async update(user:User): Promise<void> {
    const script = `
      UPDATE application_user
      SET
        username = $1,
        password = crypt($2, gen_salt('bf'))
      WHERE uuid = $3
    `;

    const values = [ user.username, user.password, user.uuid ];

    await db.query<{uuid: string}>(script, values);

  }

  async remove(uuid: string): Promise<void> {
    const script = `
    DELETE
    FROM application_user
    WHERE uuid = $1
    `;
    
    const values = [ uuid ];

    await db.query(script, values);
  }
}

export default new UserRepository();