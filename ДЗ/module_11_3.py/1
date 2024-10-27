def introspection_info(obj):
    # Определение типа объекта
    obj_type = type(obj).__name__

    # Получение атрибутов объекта
    attributes = dir(obj)

    # Получение методов объекта
    methods = [method for method in attributes if callable(getattr(obj, method))]

    # Определение модуля, к которому объект принадлежит
    module = obj.__class__.__module__

    # Другие интересные свойства объекта (в данном примере не добавлены)
    # other_properties = {}

    # Создание словаря с информацией об объекте
    info = {'type': obj_type, 'attributes': attributes, 'methods': methods, 'module': module},
            # 'other_properties': other_properties}

    return info

# Интроспекция числа
number_info = introspection_info(42)
print(number_info)

# Интроспекция строки
string_info = introspection_info('Hello')
print(string_info)

# Интроспекция списка
list_info = introspection_info([1, 20, 4.0, 'word'])
print(list_info)
