const list = {
  1: {
    id: '1',
    name: 'James Herfield',
    initials: 'JH',
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  },
  2: {
    id: '2',
    name: 'Lars Urlich',
    initials: 'LU',
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  },
  3: {
    id: '3',
    name: 'Kirck Hammet',
    initials: 'KH',
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  },
  4: {
    id: '4',
    name: 'Robert Trujillo',
    initials: 'RT',
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  },
};

const initialState = {
  list,
  current: '2',
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        current: action.current,
      };

    default:
      return state;
  }
}
