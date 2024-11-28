import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const createCourse = async (course: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return response.data;
};

export const findCoursesForEnrolledUser = async (user: any) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${user._id}/courses`);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axios.post(`${USERS_API}`, user);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axios.delete( `${USERS_API}/${userId}` );
  return response.data;
};

export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
};

export const findUserByUsername = async (user: any) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${user.username}`);
  return response.data;
};

export const findUserByCredentials = async (credentials: any) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/credentials`, credentials);
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await axios.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await axios.get(`${USERS_API}?name=${name}`);
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post( `${USERS_API}/signin`, credentials);
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};