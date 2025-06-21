import datetime

class Date:
    
    def convert_date(user_date):
        date = datetime.datetime.strptime(user_date, '%d.%m.%Y')
        return date
