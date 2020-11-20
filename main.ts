namespace SpriteKind {
    export const NPC = SpriteKind.create()
    export const Map = SpriteKind.create()
}
function summon_fish (ai: boolean, force_animate: boolean) {
    left_fish_animations = [[img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . c c c c c . . . 
        . . . . . . c c 5 5 5 5 5 c . . 
        . . . . . c 5 5 5 5 5 5 5 5 c . 
        . . . . c b b b b b b 5 5 5 c . 
        . . . . c 1 1 b b 1 b b c c . . 
        . . . c 1 1 1 b b 1 1 1 c . . . 
        . . . c 1 1 1 1 b 1 1 1 c . c c 
        . . . c d 1 1 1 b 1 1 1 b b 5 c 
        . . c c d 1 c 1 b 1 b 1 5 5 5 c 
        . c c d d 1 1 1 1 1 b 1 b b 5 c 
        f d d d 1 1 1 1 1 b b 1 f . c c 
        f f f 1 1 1 1 1 1 b b b f . . . 
        . . . f f 1 1 1 b b b 5 5 f . . 
        . . . . . f f f 5 5 5 5 5 f . . 
        . . . . . . . . f f f f f f . . 
        `], [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . c c c c . . . . 
        . . . . . . c c d d d d c . . . 
        . . . . . c c c c c c d c . . . 
        . . . . c c 4 4 4 4 d c c . . . 
        . . . c 4 d 4 4 4 4 4 1 c . c c 
        . . c 4 4 4 1 4 4 4 4 d 1 c 4 c 
        . c 4 4 4 4 1 4 4 4 4 4 1 c 4 c 
        f 4 4 4 4 4 1 4 4 4 4 4 1 4 4 f 
        f 4 4 4 f 4 1 c c 4 4 4 1 f 4 f 
        f 4 4 4 4 4 1 4 4 f 4 4 d f 4 f 
        . f 4 4 4 4 1 c 4 f 4 d f f f f 
        . . f f 4 d 4 4 f f 4 c f c . . 
        . . . . f f 4 4 4 4 c d b c . . 
        . . . . . . f f f f d d d c . . 
        . . . . . . . . . . c c c . . . 
        `]]
    right_fish_animations = [[img`
        . . . . . . . . . . . . . . . . 
        . . . c c c c c . . . . . . . . 
        . . c 5 5 5 5 5 c c . . . . . . 
        . c 5 5 5 5 5 5 5 5 c . . . . . 
        . c 5 5 5 b b b b b b c . . . . 
        . . c c b b 1 b b 1 1 c . . . . 
        . . . c 1 1 1 b b 1 1 1 c . . . 
        c c . c 1 1 1 b 1 1 1 1 c . . . 
        c 5 b b 1 1 1 b 1 1 1 d c . . . 
        c 5 5 5 1 b 1 b 1 c 1 d c c . . 
        c 5 b b 1 b 1 1 1 1 1 d d c c . 
        c c . f 1 b b 1 1 1 1 1 d d d f 
        . . . f b b b 1 1 1 1 1 1 f f f 
        . . f 5 5 b b b 1 1 1 f f . . . 
        . . f 5 5 5 5 5 f f f . . . . . 
        . . f f f f f f . . . . . . . . 
        `], [img`
        . . . . . . . . . . . . . . . . 
        . . . . c c c c . . . . . . . . 
        . . . c d d d d c c . . . . . . 
        . . . c d c c c c c c . . . . . 
        . . . c c d 4 4 4 4 c c . . . . 
        c c . c 1 4 4 4 4 4 d 4 c . . . 
        c 4 c 1 d 4 4 4 4 1 4 4 4 c . . 
        c 4 c 1 4 4 4 4 4 1 4 4 4 4 c . 
        f 4 4 1 4 4 4 4 4 1 4 4 4 4 4 f 
        f 4 f 1 4 4 4 c c 1 4 f 4 4 4 f 
        f 4 f d 4 4 f 4 4 1 4 4 4 4 4 f 
        f f f f d 4 f 4 c 1 4 4 4 4 f . 
        . . c f c 4 f f 4 4 d 4 f f . . 
        . . c b d c 4 4 4 4 f f . . . . 
        . . c d d d f f f f . . . . . . 
        . . . c c c . . . . . . . . . . 
        `]]
    local_choice = randint(0, 1)
    sprite_fish = sprites.create(right_fish_animations[local_choice][0], SpriteKind.NPC)
    tiles.placeOnRandomTile(sprite_fish, myTiles.tile13)
    character.loopFrames(
    sprite_fish,
    left_fish_animations[local_choice],
    100,
    character.rule(Predicate.MovingLeft)
    )
    character.loopFrames(
    sprite_fish,
    right_fish_animations[local_choice],
    100,
    character.rule(Predicate.MovingRight)
    )
    if (force_animate) {
        character.setCharacterState(sprite_fish, character.rule(Predicate.MovingRight))
    }
    sprites.setDataNumber(sprite_fish, "paused_x", sprite_fish.x)
    sprites.setDataNumber(sprite_fish, "paused_y", sprite_fish.y)
    if (ai) {
        path = scene.aStar(tiles.locationOfSprite(sprite_fish), tiles.getTilesByType(myTiles.tile12)[randint(0, tiles.getTilesByType(myTiles.tile12).length - 1)])
        scene.followPath(sprite_fish, path, randint(40, 60))
    }
    return sprite_fish
}
spriteutils.createRenderable(200, function (screen2) {
    if (loading >= 0) {
        screen2.fill(15)
        screen2.drawRect(scene.screenWidth() / 2 - 25, scene.screenHeight() / 2 - 3, 50, 6, 1)
        screen2.fillRect(scene.screenWidth() / 2 - 23, scene.screenHeight() / 2 - 1, Math.map(loading * 100, 0, 100, 0, 46), 2, 1)
    }
})
info.onCountdownEnd(function () {
    for (let index = 0; index <= 9; index++) {
        tiles.setWallAt(tiles.getTileLocation(3, index + 1), false)
    }
    in_game = true
    pause_fish = false
})
function start_game () {
    info.startCountdown(10)
}
function initilize_map () {
    loading = 0
    scene.setBackgroundColor(9)
    tiles.setTilemap(tiles.createTilemap(hex`40000c000202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202141415151516161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161313151515161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161613131515151616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616131315151516161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161313151515161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161613131515151616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616131315151516161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161313151515160f161616161616161616161616161616161616161616161616161616161616160f16161616161616161616161616161616161616161616160f1613131616160c1016161616161616160c161616161616161616161616161616160c16161616161016161616161616161616161616160c1616161616161616101613131616160d1103161616161616160d0809161616161616030405161616160b0e161616160312091616160b1616160706161616160d160a1616161603161116131301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101`, img`
        2222222222222222222222222222222222222222222222222222222222222222
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        .....2........2.......222.....2....2.........22......2....2.....
        2222222222222222222222222222222222222222222222222222222222222222
        `, [myTiles.transparency16,sprites.builtin.oceanSand6,sprites.dungeon.hazardWater,sprites.builtin.coral0,sprites.builtin.coral4,sprites.builtin.coral5,sprites.builtin.coral2,sprites.builtin.coral1,myTiles.tile1,myTiles.tile2,myTiles.tile3,myTiles.tile4,myTiles.tile5,myTiles.tile6,myTiles.tile7,myTiles.tile8,myTiles.tile9,myTiles.tile10,myTiles.tile11,myTiles.tile12,myTiles.tile14,myTiles.tile13,myTiles.tile15], TileScale.Sixteen))
    for (let index = 0; index < user_fish_count - 1; index++) {
        summon_fish(true, true)
        loading += 1 / (user_fish_count - 1)
        pause(100)
    }
    pause(100)
    tiles.setTilemap(tiles.createTilemap(hex`40000c000202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202141415151516161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161313151515161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161613131515151616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616131315151516161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161313151515161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161613131515151616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616131315151516161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161313151515160f161616161616161616161616161616161616161616161616161616161616160f16161616161616161616161616161616161616161616160f1613131616160c1016161616161616160c161616161616161616161616161616160c16161616161016161616161616161616161616160c1616161616161616101613131616160d1103161616161616160d0809161616161616030405161616160b0e161616160312091616160b1616160706161616160d160a1616161603161116131301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101`, img`
        2222222222222222222222222222222222222222222222222222222222222222
        ...2............................................................
        ...2............................................................
        ...2............................................................
        ...2............................................................
        ...2............................................................
        ...2............................................................
        ...2............................................................
        ...2............................................................
        ...2............................................................
        ...2.2........2.......222.....2....2.........22......2....2.....
        2222222222222222222222222222222222222222222222222222222222222222
        `, [myTiles.transparency16,sprites.builtin.oceanSand6,sprites.dungeon.hazardWater,sprites.builtin.coral0,sprites.builtin.coral4,sprites.builtin.coral5,sprites.builtin.coral2,sprites.builtin.coral1,myTiles.tile1,myTiles.tile2,myTiles.tile3,myTiles.tile4,myTiles.tile5,myTiles.tile6,myTiles.tile7,myTiles.tile8,myTiles.tile9,myTiles.tile10,myTiles.tile11,myTiles.tile12,myTiles.tile14,myTiles.tile13,myTiles.tile15], TileScale.Sixteen))
    sprite_player_fish = summon_fish(false, false)
    sprite_player_fish.setKind(SpriteKind.Player)
    controller.moveSprite(sprite_player_fish, 50, 50)
    scene.cameraFollowSprite(sprite_player_fish)
    for (let location of tiles.getTilesByType(myTiles.tile13)) {
        tiles.setTileAt(location, myTiles.tile15)
    }
    loading = -1
}
function update_minimap () {
    map = minimap.minimap(MinimapScale.Eighth, 2, 11)
    for (let sprite of sprites.allOfKind(SpriteKind.NPC)) {
        minimap.includeSprite(map, sprite, MinimapSpriteScale.MinimapScale)
    }
    minimap.includeSprite(map, sprite_player_fish, MinimapSpriteScale.MinimapScale)
    return minimap.getImage(map)
}
function create_minimap () {
    sprite_map = sprites.create(update_minimap(), SpriteKind.Map)
    sprite_map.bottom = scene.screenHeight() - 2
    sprite_map.x = scene.screenWidth() / 2
    sprite_map.z = 50
    sprite_map.setFlag(SpriteFlag.RelativeToCamera, true)
}
let sprite_map: Sprite = null
let map: minimap.Minimap = null
let sprite_player_fish: Sprite = null
let path: tiles.Location[] = []
let sprite_fish: Sprite = null
let local_choice = 0
let right_fish_animations: Image[][] = []
let left_fish_animations: Image[][] = []
let loading = 0
let pause_fish = false
let in_game = false
let user_fish_count = 0
user_fish_count = 10
let user_shark_count = 0
in_game = false
pause_fish = true
loading = -1
initilize_map()
create_minimap()
start_game()
game.onUpdate(function () {
    if (pause_fish) {
        for (let sprite of sprites.allOfKind(SpriteKind.NPC)) {
            sprite.setPosition(sprites.readDataNumber(sprite, "paused_x"), sprites.readDataNumber(sprite, "paused_y"))
        }
        for (let sprite of sprites.allOfKind(SpriteKind.Player)) {
            sprite.setPosition(sprites.readDataNumber(sprite, "paused_x"), sprites.readDataNumber(sprite, "paused_y"))
        }
    }
})
forever(function () {
    sprite_map.setImage(update_minimap())
})
