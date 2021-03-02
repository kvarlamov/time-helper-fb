export default class Target {
    constructor(
        id,
        name, 
        timeTarget,
        timePassed,
        userId
    ) {
        this.id = id;
        this.name = name;
        this.timeTarget = timeTarget;
        this.timePassed = timePassed;
        this.userId = userId;
    }
}