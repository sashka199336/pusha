def isprime(num):
    '''Проверка числа, простое ли оно'''
    for n in range(2, int(num ** 0.5) + 1):
        if num % n == 0:
            return False
    return True


def is_prime(func):
    '''
    Декоратор
    Печатает Простое или Составное для результата декорируемой функции
    '''
    def wrapper(*args, **kwargs):
        res = func(*args, **kwargs)
        print('Простое' if isprime(res) else 'Составное')
        return res
    return wrapper


@is_prime
def sum_three(a, b, c):
    '''Возвращает сумму трёх аргументов'''
    return a + b + c


result = sum_three(2, 3, 6)
print(result)
print(sum_three(5, 5, 4))
