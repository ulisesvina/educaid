const handler = async (req, res) => {
    if (req.method !== "POST")
      return res.status(405).end({
        error: "Method not allowed",
      });
    try {
      console.log(req.body)
      fetch(`http://34.95.15.24:8000/explain?subject=${req.body.subject}&condition=${req.body.diagnosis}&interest=${req.body.interest}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((data) => {
          res.status(200).json(data);
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  };
  
  export default handler;
  