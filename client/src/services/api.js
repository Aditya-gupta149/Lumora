import axios from "axios";

const API = axios.create({
  baseURL: "https://lumora-backend-xj4p.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getUsers = async () => {
  const res = await API.get("/users");
  return res.data;
};

export const accessChat = async (userId) => {
  const res = await API.post("/chat", {
    userId,
  });

  return res.data;
};

export const createChat = async (userId) => {
  const token = localStorage.getItem("token");

  const res = await API.post(
    "/chat",
    { userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getMessages = async (chatId) => {
  const token = localStorage.getItem("token");

  const res = await API.get(`/message/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const sendMessage = async (chatId, content) => {
  const token = localStorage.getItem("token");

  const res = await API.post(
    "/message",
    {
      chatId,
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const createGroup = async (chatName, users) => {
  const token = localStorage.getItem("token");

  const res = await API.post(
    "/chat/group",
    {
      chatName,
      users,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getChats = async () => {
  const res = await API.get("/chat");
  return res.data;
};

export const deleteMessage = async (id) => {
  const res = await API.delete(`/message/${id}`);
  return res.data;
};

export const editMessage = async (id, content) => {
  const res = await API.put(`/message/${id}`, {
    content,
  });

  return res.data;
};

export const getLastSeen = async (userId) => {
  const res = await API.get(`/users/lastseen/${userId}`);
  return res.data;
};

export default API;