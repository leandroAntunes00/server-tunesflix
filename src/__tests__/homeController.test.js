import homeController from '../controllers/homeController.js';

describe('Home Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('getHome', () => {
    it('should send "Hello World!" message', () => {
      homeController.getHome(req, res);

      expect(res.send).toHaveBeenCalledWith('Hello World!');
      expect(res.send).toHaveBeenCalledTimes(1);
    });

    it('should call res.send once', () => {
      homeController.getHome(req, res);

      expect(res.send).toHaveBeenCalledTimes(1);
    });
  });
});
