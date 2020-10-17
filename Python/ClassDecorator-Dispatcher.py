from functools import singledispatch

class Dispatcher:

    def __init__(self, event):

        self.nome = event
        self.tipos = {}
    def when(self, func):
        print(self.nome)
        return func
    def __call__(self, func):
        self.func = func
        func.when = self.when
        print(f"Func register: {func}")

        return func

@Dispatcher("teste")
def fool(event):
    ...

@fool.when
def bool(event):
    ...
@singledispatch
def f(event):
    ...






