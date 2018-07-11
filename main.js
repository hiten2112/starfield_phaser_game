var game = new Phaser.Game(800,600,Phaser.CANVAS,'gameDiv');

var spacefield;
var backgroundv;

var player;

var cursors;


var bullets;
var bulletTime = 0;
var fireButton;

var enemies;

var mainState =
{
  preload : function()
  {
  game.load.image('starfield' , "assets/starfield.png");
  game.load.image('player' , "assets/player.png");

  game.load.image('bullet', "assets/bullet.png");


  game.load.image('enemy',"assets/enemy.png");


  },
  create : function()
  {
  spacefield = game.add.tileSprite(0,0,800,600,'starfield');
  backgroundv = 2;

      player = game.add.sprite(game.world.centerX,game.world.centerY + 200, 'player');
      game.physics.enable(player,Phaser.Physics.ARCADE);
      cursors = game.input.keyboard.createCursorKeys();


      bullets = game.add.group();
      bullets.enableBody = true;
      bullets.physicsBodyType = Phaser.Physics.ARCADE;
      bullets.createMultiple(30,'bullet');
      bullets.setAll('anchor.x',0.5);
      bullets.setAll('anchor.y',1);
      bullets.setAll('outOfBoundskill', true);
      bullets.setAll('checkWorldBounds', true);

      fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      enemies = game.add.group();
      enemies.enableBody = true;
      enemies.physicsBodyType = Phaser.Physics.ARCADE;


      createEnemies();

      scoreText = game.add.text(0,550,'Score:',{font: '32px Arial',fill:'#fff'});
      winText = game.add.text(game.world.centerX,game.world.centerY,'you win!',{font: '32px Arial',fill:'#fff'});
      winText.visible =false;


  },


  update : function()
  {

   game.physics.arcade.overlap(bullets,enemies,collisionHandler,null,this);

   player.body.velocity.x = 0;

   spacefield.tilePosition.y += backgroundv;
   if(cursors.left.isDown)
   {
     player.body.velocity.x = -350;
   }
   if(cursors.right.isDown)
   {
     player.body.velocity.x = 350;
   }

   if (fireButton.isDown)
   {
     fireBullet();
   }

   scoreText.text = 'Score:' + score;

   if(score == 4000)
   {
     winText.visible = true;
     scoreText.visible = false;
   }

  }
}


function fireBullet() {

  if (game.time.now > bulletTime) {

    bullet = bullets.getFirstExits(false);

    if (bullet) {
      bullet.reset(player.x + 14 ,player.y);
      bullet.body.velocity.y = -400;
      bulletTime = game.time.now + 200;
    }
  }
}


function createEnemies(){

     for(var y = 0; y< 4; y++)
     {
       for (var x =0; x<10;x++)
       {
         var enemy = enemies.create(x*48,y*50,'enemy');
         enemy.anchor.setTo(0.5,0.5);
       }
     }


     enemies.x = 100;
     enemies.y = 50;


     var tween = game.add.tween(enemies).to{x:200},2000,Phaser.Easing.LinearNone,true,0,1000,true);
     tween.onLoop.add(descend,this);
}


fucntion descend(){
   enemies.y += 10;
}

function collisionHandler() {
   bullet.kill();
   enemy.kill

   score +=100;
}


game.state.add('mainState',mainState);
game.state.start('mainState');
