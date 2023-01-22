const handler = async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).end({
      error: "Method not allowed",
    });
  try {
    fetch("http://34.95.15.24:8000/diagnosis", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body.answers),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
        res.status(200).json(data);
        console.log(data);
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
