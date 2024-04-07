import axios from "axios";
import { API_VERSION } from "./api";

export const createUserAPI = async (
  formData: IServiceFormState
): Promise<HTTPRequestUser> => {
  try {
    const { data } = await axios.post<HTTPRequestUser>(
      `api/${API_VERSION}/users`,
      {
        ...formData,
        ...formData.students,
      }
    );

    if (!data.success) {
      throw new Error("request not successful");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const requestUserPinByEmailAPI = async (email: string) => {
  try {
    const { data } = await axios.post(`api/${API_VERSION}/users/utils`, {
      email,
    });

    if (!data.success) {
      throw new Error("request not successful");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUserSeatsByPinAPI = async (
  userpin: string,
  userseats: number,
  newServiceId: string
) => {
  const formData = { userseats, newServiceId };
  try {
    const { data } = await axios.put(
      `api/${API_VERSION}/users/utils/${userpin}`,
      {
        ...formData,
      }
    );

    if (!data.success) {
      throw new Error("request not successful");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserByPinAPI = async (userpin: string) => {
  try {
    const { data } = await axios.delete(
      `api/${API_VERSION}/users/utils/${userpin}`
    );

    if (!data.success) {
      throw new Error("request not successful");
    }

    return data;
  } catch (error) {
    throw error;
  }
};
