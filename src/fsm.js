class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) throw(Error());
        this.initial = config.initial;
        this.states = config.states;

        this.state = this.initial;
        this.history = [];

        this.history.push(this.initial);
        this.current = 0;

    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (typeof this.states[state] === "undefined") throw(Error());

        if (this.history.length != this.current + 1) this.history.pop();
        this.history.push(state);
        this.current++;
        this.state = this.history[this.current];
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (typeof this.states[this.state]['transitions'][event] === "undefined") throw(Error());

        this.state = this.states[this.state]['transitions'][event];
        
        if (this.history.length != this.current + 1) this.history.pop();
        this.history.push(this.state);  

        this.current++;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.initial;
        this.clearHistory();
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let arr = [];
        if (!event) {
            for (let key in this.states) arr.push(key);
            return arr;
        }
        let arr_states = [];
        for (let key1 in this.states) {
            if (event in this.states[key1]['transitions']) arr_states.push(key1);
        }
        return arr_states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length == 1 || this.current <= 0) return false;
        this.current--;
        this.state = this.history[this.current];
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.history.length == 1 || this.current >= this.history.length-1) return false;

        this.current++;
        this.state = this.history[this.current];
        return true;

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        for (let i = 0; i < this.history.length; i++) {
            this.history.pop();
        }
        this.current = 0;
        this.state = this.initial;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
