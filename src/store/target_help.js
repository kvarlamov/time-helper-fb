export default class Target {
    constructor(
        id = null,
        name, 
        timeTarget,
        timePassed,
        userId = null
    ) {
        this.id = id;
        this.name = name;
        this.timeTarget = timeTarget;
        this.timePassed = timePassed;
        this.userId = userId;
    }
}