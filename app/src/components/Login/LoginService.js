export async function signin(payload) {
    var url = '/api/auth/signin';
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const loginResponse = await response.json();
    console.log(loginResponse);
  
    return loginResponse;
  }
  