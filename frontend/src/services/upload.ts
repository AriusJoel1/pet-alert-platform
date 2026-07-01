import api from "./api";

export async function uploadImage(file: File) {

  const form = new FormData();

  form.append("file", file);

  const response = await api.post(
    "/upload",
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  console.log("UPLOAD:", response.data);

  return response.data.url;
}