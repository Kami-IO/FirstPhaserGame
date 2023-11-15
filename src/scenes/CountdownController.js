export default class CountdownController {

    /** @type {Phaser.Scene} */
    scene
    
    /** @type {Phaser.GameObjects.Text} */
    label

    /** @type {Phaser.Time.TimerEvent} */
    timerEvent

    /** @type {() => void} */
    finishedCallback

    duration = 0;

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {Phaser.GameObjects.Text} label 
     */
    constructor(scene, label) {
        this.scene = scene;
        this.label = label;
    }

    /**
     * @param {() => void } callback 
     * @param {number} duration
     * 
     */

    start(callback, duration = 45000) {

        this.stop();

        this.finishedCallback = callback;

        // add timerevent to scene
        this.scene.time.addEvent({
            delay: duration,
            callback: () => {
                this.stop();
                if(callbck) {
                    callback();
                }
            }
        })
    }

    stop() {
        // if there is already an ongoing timerevent, destroy it
        if(this.timerEvent) {
            this.timerEvent.destroy();
            this.timerEvent = undefined;
        }
    }

    update() {
        if(!this.timerEvent) {
            return;
        }

        const elapsed = this.timerEvent.getElapsed();
        const remaining = this.duration - elapsed;
        const seconds = remaining / 1000;

        this.label.text = seconds.toFixed(2);


    }
}