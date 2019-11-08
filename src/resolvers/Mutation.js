import bcrypt from "bcryptjs";

import generateToken from "../utils/generateToken";
import hashPassword from "../utils/hashPassword";

const Mutation = {
  async login(parent, args, { User }, info) {
    const { data } = args;
    const user = await User.findOne({
      email: data.email
    }).lean();
    console.log(user);
    if (!user) {
      throw new Error("Wrong email or password");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new Error("Wrong email or password");
    }

    return {
      user,
      token: generateToken(user.id)
    };
  },
  async createUser(parent, args, { User }, info) {
    const { data } = args;
    const password = await hashPassword(data.password);
    const user = await User.create({
      ...data,
      password
    });
    console.log(user);
    return {
      user,
      token: generateToken(user.id)
    };
  }
};

export default Mutation;