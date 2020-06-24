
class OrderController {
  store(req, res) {
    return res.status(200).json({ message: 'OrderController is working!' });
  }
}

export default new OrderController();