class AuthException(BaseException):

    def __init__(self, message: str = "Base auth exception", code: int = 100):
        self.message = message
        self.code = code

    def __str__(self):
        return str(self.to_json())

    def to_json(self):
        return {"message": self.message, "code": self.code}
