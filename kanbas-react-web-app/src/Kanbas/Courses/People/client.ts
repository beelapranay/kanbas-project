import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/users`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const enrollUser = async (userId: any) => {
  const { data } = await axiosWithCredentials.put(
    `${ENROLLMENTS_API}/${userId}`,
  );
  return data;
};
export const unenrollUser = async (userId: string) => {
    const response = await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${userId}`);
    return response.data;
};