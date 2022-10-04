const serializers = {
  req: (req) => ({
    method: req.method,
    url: req.url,
    remoteAddress: req.remoteAddress,
    remotePort: req.remotePort,
  }),
  res: (res) => ({
    statusCode: res.statusCode,
  }),
  err: (err) => ({
    type: err.type,
    message: err.message,
  }),
};

module.exports = {
  serializers,
};
