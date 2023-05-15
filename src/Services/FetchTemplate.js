import { useParams, useNavigate } from "react-router-dom";

function fetchTemplate(url, requestMethod, jwt, requestBody) {
  const urlPrefix = "http://localhost:8080";
  url = urlPrefix + url;
  const id = 2;
  const fetchData = {
    headers: {
      "Content-Type": "application/json",
    },
    method: requestMethod,
  };

  if (jwt) {
    fetchData.headers.Authorization = `Bearer ${jwt}`;
  }

  if (requestBody) {
    fetchData.body = JSON.stringify(requestBody);
  }

  return fetch(url, fetchData).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  });
}

export default fetchTemplate;
