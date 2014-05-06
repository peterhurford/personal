// Vocabulary used in the Text Adventure

var Synonyms = new Object;
NUM_SYNS = 0;

function words(string) {
	if(string.indexOf(".")==-1) { string += "." + string; } // er... I have no idea why this should be necessary, but nothing works without it!
	Synonyms[++NUM_SYNS] = string.substring(0,string.indexOf(".")) + "." + string + ".";
}

// All recognised words, and their synonyms
// Names of persons and places need not be listed here,
// unless they have synonyms
// all things, however, must be listed

// Directions
words("north.n");
words("south.s");
words("east.e");
words("west.w");
words("down.d.descend.downward");
words("up.u.ascend.upstair.upward.climb");
words("out.exit.exeunt.outward.outside.o");
words("in.enter.inward.inside.i.into");
// ...so that we can do this
DIRECTIONS="";
for(var i=1;i<=NUM_SYNS;++i)
	DIRECTIONS+=Synonyms[i];
	
	
// Actions
words("undo");
words("transcript");
words("terse.unverbose");
words("verbose.unterse");
words("wait.z");
words("dir");
words("help");
words("credits");
words("score.points");
words("restart");
words("save.checkpoint");
words("load");
words("delete");
words("sail");
words("hint.clue");
words("take.get.pick.pickup.grab.catch.steal.borrow");
words("break.tip.tear.destroy.rip.smash");
words("drop.put");
words("talk.tell.chat.ask.speak.say.question.mutter.whisper.interrogate");
words("hello.hi.sup.greetings.salutations.hey");
words("give.show.present.bequeathe.offer.proffer.feed");
words("wake.awake.awaken");
words("look.l.x.lookat.lookit.looky.examine.exam.see.view.read.peruse.search.describe.is.admire.observe.spy");
words("fight.hit.kill.smite.punch.kick.stab.attack.batter.bash.lunge.smack.spank.murder.slaughter.eviscerate.shoot");
words("die");
words("wear.puton.don");
words("remove.takeoff.unwear.disrobe");
words("on");
words("off");
words("overwrite");
words("push.press");
words("start.begin");
words("open.unlock");
words("close.shut.lock");
words("ride.mount.straddle");
words("dress");
words("dig");
words("swim.paddle");
words("sit");
words("sleep.nap");
words("grind.sharpen");
words("scissors.scissor.nailscissor");
words("cut.snip.chop");
words("eat.munch.chew.swallow");
words("drink.guzzle.chug.shotgun");
words("jump.leap");
words("move");
words("smell.sniff.inhale.breathe");
words("buy.purchase");
words("blow");
words("shout.scream.yell");
words("sneeze");
words("wave.flap");
words("cook");
words("swear." + rot13("shpx.sneg.phag.nefr.pbpx.jnax.fuvg.fuvgr.frk.encr.shpxvat.znfgheongr.nff.uhzc"));
words("bury");
words("kiss.snog.smooch");
words("answer");
words("cook.bake");
words("drive");
words("gamble.play");
words("insert.stuff");
words("fill");
words("empty.pour");
words("bathe.shower");
words("climb.scale");
words("search.rustle");
words("blow");

//People
words("self.myself.me.nick.carraway.character");
words("it.them");
words("him.her");
words("mister.mr");
words("miss.ms.mrs");
words("buchanan");
words("wilson");
words("drunkard.drunk.bum.homeless.wasted");
words("people.patron");

//Places
words("house.home.abode.domicile.mansion.residence.building.apartment");
words("station");
words("egg");
words("beach");
words("basement.downstair");
words("lower");
words("elevator");
words("speakeasy");
words("jail.cell");
words("elevator");

//Things
words("note.letter");
words("door.doorway");
words("gate.gateway");
words("window");
words("beach.shore.coast");
words("water.ocean.lake.sea.river");
words("sign.signpost.emblem.billboard.eye.eckleburg");
words("road.street.avenue");
words("train.locomotive.choochoo");
words("book");
words("key");
words("phone.telephone.call.ringing.ring");
words("ticket");
words("mailbox.mail");
words("food");
words("table.desk");
words("chair");
words("picture.portrait.painting");
words("duck");
words("pond");
words("tree.forest");
words("light");
words("beach.shore");
words("staircase.stair");
words("seat.couch.sofa");
words("plate.plates");
words("silverware.fork.spoon.knife");
words("paper");
words("oven.cooker");
words("cupboard.cabinet");
words("bread.slice");
words("ash.ashe");
words("wine.liqour.alcohol.bottle");
words("ice");
words("token.coin");
words("money.buck.ten.tenner");
words("wrench.wrenches");
words("flower");
words("vase");
words("ice.bag");
words("car.vehicle");
words("brick.block");
words("dust");
words("toilet");
words("sink");
words("bed");
words("nightstand");
words("store.shop");
words("drape");
words("garbage.trash.junk");
words("fence");
words("candle");
words("lever");
words("fountain.bubbler");
words("slot");
words("suit");
words("hat.cap");
words("horizon");
words("invitation.invite");
words("bedroom");

//Others
words("inventory.inv.invent.carrying.stuff.possession.pocket");
words("game");
words("all.everything");
words("baby");
words("mode");
words("mary");
words("sturgeon");
words("haddock");
words("swordfish");
words("calomel.caramel");
words("password.pw");
words("affair");
words("corrupt.corruption");
words("trouble.situation.problem");
words("authorization");
words("conversation");
words("xyzzy");
words("sure");
words("skip");
words("chapter");


function rot13(txt) {
	var rot_alpha = "abcdefghijklmnopqrstuvwxyzabcdefghijklmABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLM";
	var op = "";
	for(var i = 0; i < txt.length; i++) {
		var c = txt.charAt(i);
		if (rot_alpha.indexOf(c) != -1) { op += rot_alpha.charAt(rot_alpha.indexOf(c)+13); }
		else { op += c; }
	}
	return(op);
}