import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};

export const findCoursesForEnrolledUser = async (user: any) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${user._id}/courses`);
  return data;
};

export const createUser = async (user: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}`, user);
  return data;
}

export const deleteUser = async (user: any) => {
  const { data } = await axiosWithCredentials.delete(`${USERS_API}/${user._id}`);
  return data;
}

export const findAllUsers = async () => {
  const { data } = await axiosWithCredentials.get(USERS_API);
  return data;
}

export const findUserById = async (user: any) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${user._id}`);
  return data;
}

export const findUserByUsername = async (user: any) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${user.username}`);
  return data;
}

export const findUserByCredentials = async (credentials: any) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/credentials`, credentials);
  return data;
}

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
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};