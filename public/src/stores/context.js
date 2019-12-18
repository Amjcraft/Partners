import { Subject } from 'rxjs';

const subject = new Subject();
const initialState = {};

let state = initialState;

const contextStore = {
    init: () => {
        state = { ...state };
        subject.next(state);
    },
    subscribe: setContext => subject.subscribe(setContext),
    setContext: context => {
        state = context;
        subject.next(state);
    },
    updateContext: context => {
        state = { ...context };
        subject.next(state);
    },
    initialState,
};

export default contextStore;
