export async function syncSession(user: any) {
  const idToken = await user.getIdToken();
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  return res.ok;
}
