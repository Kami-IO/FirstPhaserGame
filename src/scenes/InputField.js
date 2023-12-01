import Phaser from "phaser";

class InputField extends Phaser.Scene
{
    preload ()
    {
        this.load.html('loginform', '../assets/html/loginform');
    }

    create() {
        this.add.image(400, 300, 'pic');
    
        const text = this.add.text(10, 10, 'Please login to play', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});
    
        // Use the correct key ('loginform') when creating from cache
        const element = this.add.dom(400, 600).createFromCache('loginform');
    
        if (!element) {
            console.error('Failed to create element from cache.');
            return;
        }
    
        // Check if element.node is present before accessing style property
        if (!element.node) {
            console.error('Element.node is null.');
            return;
        }
    
        // Set perspective
        try {
            if (!element.node.style) {
                console.error('Style property is null.');
                return;
            }
    
            element.setPerspective(800);
        } catch (error) {
            console.error('Error setting perspective:', error.message);
            return;
        }

        element.addListener('click');

        element.on('click', function (event)
        {

            if (event.target.name === 'loginButton')
            {
                const inputUsername = this.getChildByName('username');
                const inputPassword = this.getChildByName('password');

                //  Have they entered anything?
                if (inputUsername.value !== '' && inputPassword.value !== '')
                {
                    //  Turn off the click events
                    this.removeListener('click');

                    //  Tween the login form out
                    this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

                    this.scene.tweens.add({
                        targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
                        onComplete: function ()
                        {
                            element.setVisible(false);
                        }
                    });

                    //  Populate the text with whatever they typed in as the username!
                    text.setText(`Welcome ${inputUsername.value}`);
                }
                else
                {
                    //  Flash the prompt
                    this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                }
            }

        });

        this.tweens.add({
            targets: element,
            y: 300,
            duration: 3000,
            ease: 'Power3'
        });
    }
}

export default InputField;

