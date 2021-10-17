import db from "../db";
import User from "../models/user.model";


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
    const querySearch = `
      SELECT uuid, username
      FROM application_user
      WHERE uuid = $1
    `;
    const values = [uuid];

    const { rows } = await db.query<User>(querySearch, values);
    const [ user ] = rows;

    return user;
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
}

export default new UserRepository();