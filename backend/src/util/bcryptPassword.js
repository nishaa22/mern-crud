import bcrypt from "bcrypt";

export const passwordHashing = async (password, salt) => {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export const passwordComparison = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}