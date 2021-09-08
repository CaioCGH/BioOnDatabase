import axios from 'axios';

const API_URL = '/api/auth/';

class AuthService {
  async login(user) {
    var url = API_URL + 'signin';

    var payload = {
      username: user.username,
      password: user.password
    }
    console.log(url);
    
    var response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    var data =  await response.json();
    if (data.accessToken) {
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
  }
  login2(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    console.log("removing user");
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();