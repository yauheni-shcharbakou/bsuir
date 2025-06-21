# Методы для конвертации данных

from app.player import Player
from app.rate import Rate
from app.track import Track
from app.session import Session

def make__json__players(info_python): # преобразование инфы об игроках из питоновского в json-формат
    players_json = []
    
    for player in info_python['players']: # перебор игроков
        players_json.append({ # добавить словарь игрока в итоговый лист
            'name': player.name,
            'id': player.id
        })
    
    return players_json # лист игроков в json

def make__json__rates(info_python): # преобразование инфы о тарифах из питоновского в json-формат
    rates_json = []
    
    for rate in info_python['rates']: # перебор тарифов
        rates_json.append({ # добавить словарь тарифа в итоговый лист
            'name': rate.name,
            'value': rate.value,
            'id': rate.id
        })
    
    return rates_json # лист тарифов в json

def make__json__tracks(info_python): # преобразование инфы о дорожках из питоновского в json-формат
    tracks_json = []
    
    for track in info_python['tracks']: # перебор дорожек
        tracks_json.append({ # добавить словарь дорожки в итоговый лист
            'name': track.name,
            'id': track.id
        })
    
    return tracks_json # лист дорожек в json

def make__json__sessions(info_python): # преобразование инфы о сеансах из питоновского в json-формат
    sessions_json = []
    
    for session in info_python['sessions']: # перебор сеансов
        sessions_json.append({ # добавить словарь сеанса в итоговый лист
            'payment': session.payment,
            'date': session.date,
            'hours': session.hours,
            'rate__id': session.rate__id,
            'track__id': session.track__id,
            'players': session.players,
            'rezult': session.rezult,
            'id': session.id
        })
    
    return sessions_json # лист сеансов в json

def make__json(info_python): # сборка полного файла json
    return {
        'players': make__json__players(info_python), 
        'rates': make__json__rates(info_python), 
        'tracks': make__json__tracks(info_python),
        'sessions': make__json__sessions(info_python)
    }

def make__python(info_json): # Преобразование json-строки данных в питон-формат
    players = [] # сборка листа с игроками
    for player in info_json['players']:
        players.append(Player(player['name'], int(player['id'])))

    rates = [] # сборка листа с тарифами
    for rate in info_json['rates']:
        rates.append(Rate(rate['name'], int(rate['value']), int(rate['id'])))

    tracks = [] # сборка листа с дорожками
    for track in info_json['tracks']:
        tracks.append(Track(track['name'], int(track['id'])))

    sessions = [] # сборка листа с сеансами
    for session in info_json['sessions']:
        session__players = []
        session__rezults = []

        for item in session['players']: # преобразование в цифры элементов массивов (надо)
            session__players.append(int(item))

        for item in session['rezult']:
            session__rezults.append(int(item))

        sessions.append(Session(session['payment'], session['date'], int(session['hours']), 
        int(session['rate__id']), int(session['track__id']), session__players, session__rezults, 
        int(session['id'])))

    return { # info_python
        'players': players, 
        'rates': rates, 
        'tracks': tracks, 
        'sessions': sessions
    }