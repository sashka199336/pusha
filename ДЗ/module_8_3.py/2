class Car:
    def __init__(self, model: str, vin: int, numbers: str):
        self.model = model  # название автомобиля
        if self.__is_valid_vin(vin):
            self.__vin = vin  # vin номер автомобиля
        if self.__is_valid_numbers(numbers):
            self.__numbers = numbers  # номера автомобиля (строка)

    def __is_valid_vin(self, vin_number):
        '''проверяет на корректность vin номер'''
        if not isinstance(vin_number, int):
            raise IncorrectVinNumber('Некорректный тип vin номер')
        elif len(str(vin_number)) != 7:
            raise IncorrectVinNumber('Неверный диапазон для vin номера')
        else:
            return True

    def __is_valid_numbers(self, numbers):
        '''проверяет на корректность номера автомобиля'''
        if not isinstance(numbers, str):
            raise IncorrectCarNumbers('Некорректный тип данных для номеров')
        elif len(numbers) != 6:
            raise IncorrectCarNumbers('Неверная длина номера')
        else:
            return True


class IncorrectVinNumber(Exception):
    def __init__(self, message):
        self.message = message


class IncorrectCarNumbers(Exception):
    def __init__(self, message):
        self.message = message


def createCar(model: str, vin: int, numbers: str) -> Car:
    '''
    Возвращает объект Car, если данные корректны.
    Иначе - None
    '''
    try:
        car = Car(model, vin, numbers)
    except (IncorrectVinNumber, IncorrectCarNumbers) as exc:
        print(exc.message)
        return None
    else:
        print(f'{car.model} успешно создан')
        return car


if __name__ == '__main__':
    first = createCar('Model1', 1000000, 'f123dj')
    second = createCar('Model2', 300, 'т001тр')
    third = createCar('Model3', 2020202, 'нет номера')
    fourth = createCar('Dodge Charger', 666.777, '2JRI424')
    fifth = createCar('Aston Martin DBS', 8026007, 122222)
