import { Subject } from 'rxjs';

const subject = new Subject();
const initialState = {
  user: {},
};

let state = initialState;

const userStore = {
  init: () => {
    state = { ...state };
    subject.next(state);
  },
  subscribe: setState => subject.subscribe(setState),
  setUser: user => {
    state = {
      ...state,
      user,
    };
    subject.next(state);
  },
  updateUser: user => {
    state = {
      ...state,
      user: { ...user },
    };
    subject.next(state);
  },
  initialState,
};

export default userStore;
