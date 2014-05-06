//	THE GREAT GATSBY TEXT ADVENTURE
//	by Peter Hurford	www.peterhurford.com

//	Story is based upon 1925 novel "The Great Gatsby" by F. Scott Fitzgerald

//	Game engine is based on a modified version of the Javascript VERSIFICATOR v0.4 engine by Robin Johnson (http://rdouglasjohnson.com/)

//  He says:
/*   "Share my technology. Hands off my art."
 *
 *   Copy and distribute freely, preserving this license.
 *
 *   You may distribute modified copies of this file, but please
 *   make it clear that you have done so, with script comments.
 *
 *   This does NOT apply to the game data files, which may be
 *   distributed in unmodified form only.
*/

// The actual game engine, below:

// Some variables
Game_state = "";
StateHash = new Object;
last_cmd = "";
stored_name = "";
sent_look = false;

// Game state is stored in two ways: an ecoded string for cookies and undo, and a hash for reading.
// When the state is changed, the string and hash are both changed; when the state is read - which is much more common - only the hash is read.
// The hash is synchronised with the string after an UNDO or RESTORE.
Undo_states = new Array();
Undo_states.length = 10; // number of UNDO states to keep in memory
for(var i=0; i < Undo_states.length; i++) { Undo_states[i] = ""; }

function push_undo_state(new_state) {
	for(var i = Undo_states.length - 1; i > 0; i--) { Undo_states[i] = Undo_states[i - 1]; }
	Undo_states[0] = new_state;
}

function pop_undo_state() {
	var old_state = Undo_states[0];
	for(var i = 0; i < Undo_states.length - 1; i++) { Undo_states[i] = Undo_states[i + 1]; }
	Undo_states[Undo_states.length - 1] = "";
	return old_state;
}

var CommandHistory = new Array();
CommandHistory.length = 10;

for(var i=0; i < CommandHistory.length; ++i) { CommandHistory[i] = ""; }
var CommandHistoryPointer = 1; // 0 is always empty
function push_command_history(new_command) {
	if(new_command != "") {
		for(var i = CommandHistory.length - 1; i > 1; i--) { CommandHistory[i] = CommandHistory[i - 1]; }
		CommandHistory[1] = new_command;
	}
}

function upKey() {
	if(CommandHistoryPointer < (CommandHistory.length - 1)) {
		if(CommandHistory[CommandHistoryPointer + 1] != "") { ++CommandHistoryPointer; }
	}
	document.getElementById("textIn").value = CommandHistory[CommandHistoryPointer];
}

function downKey() {
	if(CommandHistoryPointer > 0) { --CommandHistoryPointer; }
	document.getElementById("textIn").value = CommandHistory[CommandHistoryPointer];
}

TRANSCRIPT = "";
var WINNER = false;
ALPHANUMERICS = "abcdefghijklmnopqrstuvwxyz1234567890";
DEBUG = false;

// Pronouns
it = 0;
him = 0;

// set to cause of death, upon death
// (in some nested function calls, death must be checked for
// again 'outside the well')
DEATHSTRING = "";

MAX_TOKENS = 8;
Token = new Object;
for(var i=1; i <= MAX_TOKENS; ++i) { Token[i] = ""; }
Token_str = "";

// obey a command, after it has been tokenised
function obey() {
	//say(">" + Token_str + "<");
	IS_METACOMMAND = false;
		
	// set undo state, except for certain meta-commands
	if (gs("gameover") != 1 && !(Token[1] == "load" || Token[1] == "delete" || Token[1] == "dir" || Token[1] == "restart" || Token[1] == "undo" || Token[1] == "transcript")) {
		push_undo_state(Game_state);
		update_status();
	}

	if(Token[1] == "transcript") {
		IS_METACOMMAND = true;
		show_transcript();
	}

	else if(Token_str == "restart.game") {
		say('You sure?  Type "RESTART GAME SURE" if so.');
	}
	
	else if(Token_str == "restart.game.sure") {
		IS_METACOMMAND = true;
		start();
	}

	else if(Token[1] == "load") {
		IS_METACOMMAND = true;
		load(Token[2]);
	}
		
	else if(Token[1] == "delete") {
		IS_METACOMMAND = true;
		delete_cookie(Token[2]);
	}
		
	else if(Token[1] == "dir") {
		IS_METACOMMAND = true;
		list_cookies()
	}

	else if(Token[1] == "restart") {
		IS_METACOMMAND = true;
		if (Token[2] == "game") { start(); }
		else { say("Type RESTART GAME to begin a new game."); }
	}
	
	else if(Token[1] == "help") {
		IS_METACOMMAND = true;
		say("Ok... So welcome not only to The Great Gatsby, but text adventures and interactive fiction in general!  These graphic-less wonders were all the rage in the 1980s!  Basically, you type WORDS into the command box, press ENTER, and the game will respond by telling you what is happening, and then you respond by typing more stuff.  Together, this makes an interactive story!\n\nThe main thing you want to do is LOOK or EXAMINE various things (X for short), like the place you are at or various things you can see.  (There's no need to actually type these in all uppercase, but it makes them easier to read.)\n\nYou can LOOK to get back to a description of the place you are at.  To move, type the cardinal direction you want to go in: NORTH (N), SOUTH (S), EAST (E), WEST (W), or sometimes UP (U), DOWN (D), IN (I), or OUT (O).\n\nYou'll also need to TAKE items, TALK to people, ASK them about things or people, and GIVE them stuff.  For example, you might say \"take pie\", \"give pie to clown\", or \"ask clown about circus\".  You can see what you're carrying by typing INVENTORY.  Other verbs might come up too!  Be natural!\n\nLastly, if you need a hint about the plot, type BABY MODE.  Type SAVE GAME to save your game.")
	}

	else if(Token[1] == "credits") {
		IS_METACOMMAND = true;
		say("The Great Gatsby Text Adventure.\n\nGame design by Peter Hurford www.peterhurford.com.\nStory based upon the 1925 novel \"The Great Gatsby\" by F. Scott Fitzgerald.\nGame engine based upon VERSIFICATOR v0.4 by Robin Johnson http://rdouglasjohnson.com\nAlpha testers: Ben Hurford and Katie Lowry")
	}
	
	else if(Token[1] == "hint") {
		IS_METACOMMAND = true;
		say("Do you want a hint as to what to do next?  Type BABY MODE to recieve a hint.")
	}

	else if(Token_str == "baby.mode") {
		IS_METACOMMAND = true;
		game_hint();
	}
	
	else if(Token_str == "xyzzy") {
		IS_METACOMMAND = true;
		say("God mode activated.  Type XYZZY SKIP CHAPTER to move forward one chapter.");
	}
	
	else if(Token_str == "xyzzy.skip.chapter") {
		IS_METACOMMAND = true;
		say("Time passes...\n\n");
		narrative_jump();
	}
	
	else if(Token[1] == "undo") {
		var Undo_state = pop_undo_state();
		IS_METACOMMAND = true;
		if (Undo_state == "") { say('You cannot undo any further, sorry.'); }
		else {
			Game_state = Undo_state;
			setGameHash()
			say("Undone.");
			update_status();
		}
	}

	else if(gs("gameover") == 1) {
		say("Your game is over.\n\Type UNDO to reverse your previous choice, type RESTART GAME to restart from the beginning, or type LOAD <FILE> to load a saved game.  Type DIR to see a list of saved games.");
	}

	else if(Token_str == "") {
		if(last_cmd != "") { say("Sorry, I didn\'t understand that.  Type HELP if you don't know what you're doing."); }
		else { say("Um... you didn't say anything at all, actually.  Type HELP if you don't know what you're doing."); }
		return;
	}

	else if(Token[1] == "save") {
		IS_METACOMMAND = true;
		save(Token[2]);
		stored_name = Token[2];
	}

	else if(Token[1] == "overwrite") {
		IS_METACOMMAND = true;
		override(stored_name);
	}
		
	else if(Token[1] == "score") {
		IS_METACOMMAND = true;
		say("You have completed " + sc_percent() + "% of this adventure.");
	}
	
	else if(Token[1] == "verbose") {
		if (gs("VRBS") == 1) { say("Verbosity is already on.  Type TERSE to turn it off."); }
		else {
			IS_METACOMMAND = true;
			sgs("VRBS", 1);
			say("Maximum verbosity on.  Areas will now always be described.  Type TERSE to explain areas only when you first see them.");
		}
	}
	
	else if(Token[1] == "terse") {
		if (gs("VRBS") == 0) { say("Verbosity is already off.  Type VERBOSE to turn it on."); }
		else {
			IS_METACOMMAND = true;
			sgs("VRBS", 0);
			say("Verbosity off.  Areas will now only be described when you first see them.  Type VERBOSE to explain areas every time.");
		}
	}

	// special things that happen in the presence of certain characters, if they're awake
	else if(is_personname(Token[2]) && personloc(eval(Token[2])) == heroloc() && eval(Token[2]).reactions.indexOf(Token[1] + "::") != -1)
	{
		if(asleep(eval(Token[2])) && Token[1] != "fight") { say(capitalise(the_person(eval(Token[2]))) + " is fast asleep."); }
		else {
			var reactions = eval(Token[2]).reactions.split("/");
			for(var i=0; i<reactions.length; i++) {
				if(reactions[i].split("::")[0] == Token[1]) {
					say(reactions[i].split("::")[1]);
					break;
				}
			}
		}
	}

	// special things that happen in certain places OR
	// things that happen in the presence of characters, but aren't actions done TO
	// the character
	else if(special()) {} // Um, this doesn't look important, but I'm told that it is.
	
	// get all / drop all
	else if(Token[1]=='take' && Token[2]=='all')
	{
		var thingsInAll = false;
		for(var i=1; i<=NUM_THNG; ++i)
			if(thingloc(Thing[i])==heroloc())
			{
				if(thingsInAll) say('\n');
				thingsInAll = true;
				take_command('take ' + Thing[i].name, true);
			}
		
		if(!thingsInAll) say('There\'s nothing here that you can obviously take.');
	}
	
	else if(Token[1]=='drop' && Token[2]=='all')
	{
		var thingsInAll = false;
		for(var i=1; i<=NUM_THNG; ++i)
			if(in_inv(Thing[i]))
			{
				if(thingsInAll) say('\n');
				thingsInAll = true;
				take_command('drop ' + Thing[i].name, true);
			}
		if(!thingsInAll) say('You\'re not carrying anything.');
	}

	// Examine
	else if(Token_str == "look") { look(); }
	
	else if(Token[1] == "look" && Token[2]) {
		gotit = false;
		for (var i=2; i<4; i++) {
			if (Token[i] == "out" && !Token[i+1]) { say(list_exits().substring(1,list_exits().length)); gotit = true; break; } // look at exits
			else if (Token[i] == "inventory") { list_inv(); gotit = true; break; } // look at inventory
			else if (is_personname(Token[i])) { personsee(eval(Token[i])); gotit = true; break; } // look at character
			else if (is_sighthere(Token[i])) { sightsee(Token[i]); gotit = true; break; } // look at sight		
			else if (is_thingname(Token[i])) { thingsee(eval(Token[i])); gotit = true; break; } // look at thing
			else if (Token[i] == "self") { say("You are Nick Carraway."); gotit = true; break; } // look at self
				
			//Anywhere sights
			else if(anywhere_sights.indexOf("/" + Token[i] + "::")!=-1) {
				var sights = anywhere_sights.split("/");
				for(var i=0; i<sights.length; i++) {
					if(sights[i].split("::")[0] == Token[i]) {
						say(sights[i].split("::")[1]);
						gotit = true;
						break;
					}
				}
			}
		}
		if (gotit == false) { say("Nothing special."); }
	}
	
	// Drop
	else if(Token[1] == "drop" && !(is_thingname(Token[2]) && ('/' + eval(Token[2]).uses).indexOf('/drop::')!=-1 && in_inv(eval(Token[2])))) {
		gotit = false;
		for (var i=2; i<4; i++) {
			if (is_thingname(Token[i])) {
				drop(eval(Token[i]));
				gotit = true;
				break;
			}
		}
		if (Token[2] && gotit == false) { say("You're not carrying that."); }
		else if (gotit == false) { say("I'm not sure what you want to drop."); }
	}
	
	// Take
	else if(Token[1] == "take" && !(is_thingname(Token[2]) && ("/" + eval(Token[2]).uses).indexOf("/take::") != -1)) {
		gotit = false;
		for (var i=2; i<4; i++) {
			if (is_thingname(Token[i])) {
				take(eval(Token[i]));
				gotit = true;
				break;
			}
		}
		for (var i=2; i<3; i++) {
			if (is_personname(Token[i])) {
				var person = eval(Token[i]);
				if (personloc(person) == heroloc()) {
					say("You try and shove " + the_person(person) + " into your inventory, but he successfully resists.  Besides, you don't have a big enough inventory anyway.");
					gotit = true;
					break;
				}
				else {
					say("Wherever " + the_person(person) + " is, I don't think " + the_person(person) + " wants to go in your inventory.");
					gotit = true;
					break;
				}
			} 
		}
		if (is_sighthere(Token[2]) && gotit == false) { say("It looks a little too heavy to lift."); }
		else if (Token[2] && gotit == false) { say("You don't see one within easy reach."); }
		else if (gotit == false) { say("I'm not sure what you want to pick up."); }
	}
	
	else if(Token[1]=='inventory'||Token_str=='look.inventory')
		list_inv()

	else if(is_personname(Token[2]) && heroloc()==personloc(eval(Token[2])) && asleep(eval(Token[2])) && Token[1]!='wake')
	{
		say(capitalise(the_person(eval(Token[2]))) + ' is fast asleep.');
	}
	
	// semi-mimic Infocom's "marvin, give me the hammer" syntax
	// by interpreting this as talking to the NPC
	else if(is_personname(Token[1])) {
		var person = eval(Token[1]);
		if(personloc(person)!=heroloc())
			person_isnt_here(person)
		else if(!Token[2])
			say('I don\'t understand what you want to do to ' +
				  the_person(person) + '.')
		else
		{
			for (var i = MAX_TOKENS; i > 1; --i)
				Token[i] = Token[i - 1];
			Token[1] = 'talk';
			talk_to(eval(Token[2]));
			
			Token_str = '';
			for(var i=1; i<=MAX_TOKENS; ++i)
			{
				Token_str += Token[i];
				if(i < MAX_TOKENS)	Token_str += '.';
			}
		}
	}

	else if((Token[1] == "talk" || Token[1] == "hello") && (is_personname(Token[2]))) { talk_to(eval(Token[2])); }
	else if((Token[1]== "talk" || Token[1] == "hello") && (Token[2] == "self")) {
			say('You talk to yourself for a little while, but the conversation soon comes to an end.');
	}

	// give present to someone
	else if(Token[1] == "give") {
		if (Token[2] == "inventory") { list_inv(); }
		else if(is_personname(Token[2]) && is_thingname(Token[3])) { present(eval(Token[2]),eval(Token[3])); }
		else if(is_thingname(Token[2]) && is_personname(Token[3])) { present(eval(Token[3]),eval(Token[2])); }
		else { say("I\'m not sure what you want to show to whom."); }
	}
	
	else if(is_thingname(Token[2]) && eval(Token[2]).uses!="") {
		if(in_inv(eval(Token[2])) || thingloc(eval(Token[2]))==heroloc()) {
			var uses = eval(Token[2]).uses.split('/');
			for(var i=0;i<uses.length;++i) {
				if(uses[i].split('::')[0]==Token[1]) {
					say(uses[i].split('::')[1]);
					return;
				}
			}
			default_use(Token[1],eval(Token[2]));
			return;
		}
		else if(Token[1]=='take') { say('You can\'t see that here.'); } // say('You can\'t see the ' + Token[2] + ' here.')
		else { say('You haven\'t got the ' + Token[2] + '.'); }
	}

	else if(is_personname(Token[2]))
	{
		var person = eval(Token[2]);
		if(personloc(person)!=heroloc())
			person_isnt_here(person)
		else
		{
			if(default_react(Token[1],person))
				{} // all well and good
			else
				say('You can\'t do that to ' + the_person(person) + '.');
		}
	}

	else if(is_thingname(Token[2]))
	{
		if(in_inv(eval(Token[2])) || thingloc(eval(Token[2]))==heroloc())
		{
			default_use(Token[1],eval(Token[2]));
			return;
		}
			
		else
			say('You haven\'t got the ' + Token[2] + '.');
	}

	else if(('.'+DIRECTIONS+'.').indexOf('.'+Token[1]+'.')!=-1)
	{
		move();
	}
	
	// all 'failure' cases come at the end
	
	else if(Token[1]=='fight') {
		if(Token[2])
			say('Why? What has it ever done to you?')
		else
			say('I\'m not sure what you want to attack.')
	}
	
	else if(Token[1] == "talk") { talk_vaguely(); }
	else if (Token[1] == "hello") { talk_vaguely(); }
	else if(Token[1] == "wait") { say("Time passes..."); }
	else if (Token[1] == "open" || Token[1] == "close") { say("It's probably best if you just left things as they are."); }	
	else { say("Sorry, you can't do that."); }
}

function talk_vaguely() { // Talk to the first person you can if you don't mention a name.
	for(var i=1; i<=NUM_CHRS; i++) {
		if(personloc(eval(Person[i].name)) == heroloc()) {
			talk_to(eval(Person[i].name));
			return(true);
		}
	}
	say("No one takes any notice.");
}

// called when you attempt to foo something that isn't SPECIALLY fooed
function default_use(verb,th) {
	if(Token[3] && verb=='wear') { say("Sorry, you can\'t do that."); } // things like "put hat on signpost" fail
	else if(verb=='wear') { wear(th); }
	else if(verb=='remove') { unwear(th); }
	else if(verb == "give") {
		if(is_personname(Token[3])) { present(eval(Token[3]), eval(Token[2])); }
		else { say('I\'m not sure what you want to show to whom.'); }
	}
	else if(verb=='eat') { say('I don\'t think the ' + th.name + ' would be very tasty.'); }
	else if(verb=='talk' || verb=='hello') { say('The ' + th.name + ' ' + pldo(th) + 'n\'t seem to be very talkative.'); }
	else if(verb=='smell') { say('The ' + th.name + ' ' + pldo(th) + 'n\'t smell very interesting.'); }
	else if(verb=='kiss') { say('I don\'t think you and the ' + th.name + ' are close enough for that.'); }
	else if(verb=='fight') { say('You have no animosity towards the ' + th.name + '.'); }
	else if(verb=='wave') { say('Waving the ' + th.name + ' about has no useful effect.'); }
	else { say('You can\'t do that with the ' + th.name + '.'); }
}

function talk_to(person) {
	if(personloc(person)==heroloc()) { // talk to Person
		var say_default = true;
		
		// talk about something in particular...
		for(var j=3; j<=MAX_TOKENS; ++j) {
			if(person.subjects.indexOf(Token[j] + '::')!=-1) {
				for(var i=0;i<person.subjects.split('/').length;++i)
					if(person.subjects.split('/')[i].split('::')[0]==Token[j]) {
						say(person.subjects.split('/')[i].split('::')[1]);
						say_default = false;
					}
				
				if(!say_default) break;
			}
		}
		
		// ...or say one of this Person's default sayings
		if(say_default)
			say(person.talks.split('/')[pick(person.talks.split('/').length)]);
	}
	else
		person_isnt_here(person);
}

function present(person,thing)
{
	if(worn(thing)) {
		say('You\'ll have to take the ' + thing.name + ' off first.');
		return;
	}
	if(personloc(person)!=heroloc()) {
		say('You can\'t see ' + the_person(person) + ' here.');
		return;
	}
	if(asleep(person)) {
		say(capitalise(the_person(person)) + ' is fast asleep.');
		return;
	}
	if(!in_inv(thing)) {
		say('You\'re not carrying the ' + thing.name + '.');
		return;
	}

	var presents = person.presents.split('/');
	for(var i=0;i<presents.length;++i) {
		if(presents[i].split('::')[0]==thing.name) {
			say(presents[i].split('::')[1]);
			return;
		}
	}
	
	// try talking to the NPC about the thing instead
	if(('/' + person.subjects).indexOf(thing.name + '::')!=-1)
	{
		for(var i=0;i<person.subjects.split('/').length;++i)
			if(person.subjects.split('/')[i].split('::')[0]==thing.name)
			{
				say(person.subjects.split('/')[i].split('::')[1]);
				say_default = false;
			}

		return;
	}
	
	say(capitalise(the_person(person)) +
	  ' takes no notice of the ' + thing.name + '.');
}

function special()
{
	if(heroloc().special!='')
	{
		var specials = heroloc().special.split('/');

		for(var i=0;i<specials.length;++i)
		{	
			if((Token_str+'.').indexOf((specials[i].split('::')[0])+'.')==0 &&
			  // horrid fudge to stop 'in' catching 'inventory'
			  (Token[1]!='inventory' && specials[i].split('::')[0].indexOf('inventory')!=0))
			{
				say(specials[i].split('::')[1]);
				return(true);
			}
		}
	}
	
	for(var p=1; p<=NUM_CHRS; ++p) if(Person[p].special && personloc(Person[p]) == heroloc())
	{
		var specials = Person[p].special.split('/');
		for(var i=0;i<specials.length;++i)
		{	
			if((Token_str+'.').indexOf((specials[i].split('::')[0])+'.')==0 &&
			  (Token[1]!='inventory' && specials[i].split('::')[0].indexOf('inventory')!=0))
			{
				say(specials[i].split('::')[1]);
				return(true);
			}
		}
	}
	
	if(anywhere_special())
		return(true);

	return(false);
}

function sightsee(sight)
{
	var sights = heroloc().sights.split('/');
	for(var i=0;i<sights.length;++i)
	{
		if(('.' + sights[i].split('::')[0] + '.').indexOf(sight)>0)
		{
			it = sight;
			say(sights[i].split('::')[1]);
			return;
		}
	}
	for(var p=1; p<=NUM_CHRS; ++p) if(Person[p].sights && personloc(Person[p])==heroloc())
	{
		var sights = Person[p].sights.split('/');
		for(var i=0;i<sights.length;++i)
		{
			if(sights[i].split('::')[0]==sight)
			{
				it = sight;
				say(sights[i].split('::')[1]);
				return;
			}
		}
	}
	
	say('You can\'t see that here.');
}

function thingsee(th) {
	if(!in_inv(th) && thingloc(th)!=heroloc()) { say('You can\'t see that here.'); }
	else { say(th.description); }
}

function personsee(person) {
	if(personloc(person) == heroloc()) { say(person.description); }
	else { say("You can't see " + the_person(person) + " here."); }
}

function person_isnt_here(person) { say('You can\'t see ' + the_person(person) + ' here.'); }

function set_personloc(person,place) {
	sgs('cl_' + person.id, place.id);
}

function personloc(person) {
	return Place[gs('cl_' + person.id)];
}

function is_personname(sname) {
	for(var i=1; i<=NUM_CHRS; i++) {
		if(Person[i].name == sname) { return(true); }
	}
	return(false);
}

function the_person(person)
{
	return ((person.pname ? '' : 'the ') + person.fullname);
}

// only rudimentarily implemented -
// in particular, it'll give odd results if there is an alternative,
// indirect route from fromPlace to toPlace.
// toPlace is assumed to be heroloc()
function person_follow(person, fromPlace, toPlace)
{
	if(personloc(person)==fromPlace)
	{
		set_personloc(person, toPlace);
		say('\n' + capitalise(the_person(person)) + ' follows you.');
	}
}

function set_thingloc(thing,place)
{
	sgs('tl_' + thing.id, place.id);
}

function thingloc(thing)
{
	return Place[gs('tl_' + thing.id)];
}

function is_thingname(name)
{
	for(var i=1;i<=NUM_THNG;++i)
		if(Thing[i].name==name)
			return(true);

	// failed to find it
	return(false);
}

function say(txt)
{
	if(!txt) return;
	
	var SCROLL_INC = 300;

	if(txt.charAt(0)=='*')
	{
		eval(txt.substring(1,txt.length));
		return;
	}

	if(txt.charAt(0)=='=')
		txt = '\"' + txt.substring(1,txt.length) + '\"';

	// allow nested expressions in all say() strings
	if(txt.indexOf('[[') != -1)
	{
		var openC = txt.indexOf('[[') ;
		var closeC = txt.indexOf(']]') ;
		say(txt.substring(0, openC)) ;
		
		var evalStr = txt.substring(2 + openC, closeC);
		
		say( eval(evalStr) );
		
		say(txt.substring(2 + closeC, txt.length));

		return;
	}
	
	txt = txt.split('\n').join('<br/>');
	
	var HTMLOut = document.getElementById('outDiv').innerHTML;
	
//	HTMLOut = HTMLOut.replace('xOutEndx', 'xx');
	
	HTMLOut += txt;		// + '<a name="#xOutEndx"> </a>';
	
	TRANSCRIPT += txt;
	
	var MAX_LENGTH = 2200;
	  
	if(HTMLOut.length > MAX_LENGTH)
		HTMLOut = HTMLOut.substring(HTMLOut.length - MAX_LENGTH, HTMLOut.length) ;
	  
	document.getElementById('outDiv').innerHTML = HTMLOut;

	document.getElementById('outDiv').scrollTop += SCROLL_INC;
	
	document.getElementById('textIn').focus();
}

function show_transcript()
{
	document.getElementById('outDiv').innerHTML = TRANSCRIPT;
}

function list_exits()
{
	// quick and ugly fix
	if(!heroloc())
		set_heroloc(START_LOC);

	if(!heroloc().exits) // no exits
		return('\nThere are no exits.');

	var exits = heroloc().exits.split('.');
	for(var i=0;i<exits.length;++i)
		exits[i] = exits[i].substring(0,exits[i].indexOf('::'));

	if(exits.length==1) // one exit
		return('\nAn exit leads ' + exits[0] + '.');
	
	var exlist = '\nExits are ';
	for(var i=0;i<exits.length-1;++i)
		exlist += exits[i] + ', '
	
	exlist = exlist.substring(0,exlist.lastIndexOf(',')) +
	  ' and ' + exits[exits.length-1] + '.';
	
	return(exlist);
}

function list_persons()
{
	var person_list = '';
	
	for(var i=1;i<=NUM_CHRS;++i)
	{
		if(personloc(Person[i])==heroloc())
		{
			person_list += '\n';
			
			var tocap = true;
			
			if(Person[i].ishere != '' && !asleep(Person[i]))
			{
				person_list += Person[i].ishere;
			}
			else 
			{
				if(!Person[i].pname)
				{
					person_list += 'A';
					if('aeiouAEIOU'.indexOf(Person[i].fullname.charAt(0))!=-1)
						person_list += 'n';
					person_list += ' ';
					tocap = false;
				}
			
				person_list += (tocap ? capitalise(Person[i].fullname) : Person[i].fullname) + ' ' +
				  (asleep(Person[i]) ? 'is here, fast asleep.' : 'is here');
			}
		}
	}
	
	return(person_list);
}

function list_things()
{
	var thing_list = '';

	for(var i=1;i<=NUM_THNG;++i)
	{
		if(thingloc(Thing[i])==heroloc())
		{
			if(thing_list!='')
				thing_list += ', ';
			thing_list += Thing[i].fullname;
		}
	}

	if(thing_list != '')
		thing_list = 'You can also see ' + thing_list + '.';
	
	if(thing_list.indexOf(',')!=-1)
		thing_list = thing_list.substring(0,thing_list.lastIndexOf(',')) +
		  ', and' + thing_list.substring(thing_list.lastIndexOf(',')+1,
		  thing_list.length);

	if(thing_list!='')
		thing_list = '\n' + thing_list;
	return(thing_list);
}

function take(th)
{
	if(in_inv(th))
	{
		say('You are already carrying the ' + th.name + '.');
		return;
	}
	
	if(thingloc(th)!=heroloc())
	{
		say('You can\'t see that here.');
//		say('You can\'t see the ' + th.name + ' here.');
		return;
	}
	
	set_thingloc(th,nowhere);
	give_hero(th);
	say('Okay. You have taken the ' + th.name + '.');
}

function give_hero(th)
{
	set_thingloc(th,nowhere);
	sgs('I_' + th.id, 1);
	return(true);
}

function drop(th)
{
	if(worn(th))
	{
		say('You can\'t drop the ' + th.name + ' - you\'re wearing ' +
		  (th.plural ? 'them!' : 'it!'));
		return(false);
	}
	
	if(!in_inv(th))
	{
		say('You are not carrying the ' + th.name + '.');
		return(false);
	}

	if(Token[3]=='in' && Token[4]) // 'put X in Y', not implemented
	{
		say('That would be pointless.');
		return false;
	}

	sgs('I_' + th.id, 0);
	set_thingloc(th,heroloc());
	say('Okay. You have dropped the ' + th.name + '.');
	return(true);
}

function in_inv(th)
{
	if(gs('I_' + th.id)==1)
		return true
	else
		return false;
}

function take_away(th)
{
	// stop thing being worn, quietly
	sgs('wrn_' + th.id, 0);
	
	set_thingloc(th,nowhere);

	sgs('I_' + th.id, 0);

	return(false);
}

function list_inv()
{
	var inv_list = '';

	for(var i=1;i<=NUM_THNG;++i)
		if(in_inv(Thing[i]))
		{
			if(inv_list!='')
				inv_list += ', ';
			inv_list += Thing[i].fullname;
			if(worn(Thing[i]))
				inv_list += ' (which you are wearing)';
		}

	if(inv_list=='')
	{
		say('You are not carrying anything.');
		return;
	}

	if(inv_list.indexOf(',')!=-1)
		inv_list = inv_list.substring(0,inv_list.lastIndexOf(',')) +
		  ', and' + inv_list.substring(inv_list.lastIndexOf(',')+1,
		  inv_list.length);

	say('You are carrying ' + inv_list + '.');

}

function move()
{
	if(Token[1]=='')
	{
//		if(('.' + DIRECTIONS + '.').indexOf('.' + Token[2] + '.')==-1)
			say('Which way?')
//		else
//		{
//			Token[1] = Token[2];
//			obey();
//		}
		
		return;
	}

	if(!heroloc().exits)
	{
		say('There are no exits from here.');
		return;
	}

	var moved = false;
	if(heroloc().exits!='')
	{
		var exits = heroloc().exits.split('.')
		for(var i=0;i<exits.length;++i)
			if(exits[i].split('::')[0]==Token[1])
			{
//				say('\nToken[1] : ' + Token[1]);
//				say('\nexits[i].split(\'::\')[1] : ' + exits[i].split('::')[1] + '\n');
				set_heroloc(eval(exits[i].split('::')[1]));
				moved = true;
			}
	}
	if(heroloc().hExits!='' && !moved)
	{
		var hExits = heroloc().hExits.split('.')
		for(var i=0; i<hExits.length; ++i)
		{
			if(hExits[i].split('::')[0]==Token[1])
			{
				Token[1] = hExits[i].split('::')[1];
				move();
				return;
			}
		}
	}
	if(!moved)
		say('You can\'t see a way ' + Token[1] +
		(Token[1]=='out' ? 'wards' : '') + // "can't see a way out" is confusing
		' from here.')
	else
		look();
}

function verbose()
{
	return (gs('VRBS') == 1);
}
function visited(pl)
{
	return ( gs('V' + pl.id) == 1 );
}
function setVisited(pl)
{
	sgs('V' + pl.id, 1);
}

function look()
{
	
	// some games may have mazes. These are defined by a place name (internal name)
	// that begins with 'maze'. In mazes, terse/verbose has no effect.
	// This is a horrible piece of coding, but hey, I'm not getting paid for this.
	
	var showDesc = ( sent_look || verbose() || Token[1] == 'look' || !visited(heroloc()) || heroloc().name.indexOf('maze')==0);
	
	sent_look = false; 
	
	say('<font color=\"' + HIGHLIGHT_COLOUR + '\"><b>' + heroloc().fullname + '</b></font>');

	if(showDesc) { say('\n' + heroloc().description ) } ;

	say(list_persons());
	say(list_things());
	say(heroloc().append); // always gets said; if you don't want this use [[eval nesting]]
						   // in the place description.
	say(anywhere_append());
	if(!winner)
		say(list_exits());
	
	setVisited(heroloc());
	
	update_status();
	
	if(gs('gameover')==1)
		die(DEATHSTRING);
}

function update_status()
{
	var txt = heroloc().fullname;
	if(gs('gameover')==1)
	{
		if(winner)
			txt = 'GAME COMPLETE!'
		else
			txt = 'GAME OVER';
	}
/*	var n = 48 - txt.length;
	for(var i=0;i<n;++i)
		txt += ' ';
	var sc = sc_percent();
	txt += 'SCORE: ' + ((sc < 100) ? ' ' : '') + ((sc < 10) ? ' ' : '') +
	  sc_percent() + '%';
*/
	document.getElementById('placeLabel').innerHTML = (gs('gameover')==1) ?
		'Game over :P' : 'Location: ' + heroloc().fullname ;
	
	document.getElementById('scoreLabel').innerHTML = 'Completion: ' + sc_percent() + '%' ;
}

function sc_percent()
{
	var sc = parseInt(gs('sc'));

	if(sc==MAX_SCORE-1)
		return(99)
		// (a) so that the player will know there is only one more thing to do;
		// (b) so it won't get rounded to 100.
	
	else if (sc==MAX_SCORE && !winner) {
		winner = true; win();
		return(100);
	}

	else { return(Math.round((sc/MAX_SCORE)*100)); }
}

function heroloc()
{
	return(Place[gs('hl')]);
}

function set_heroloc(loc)
{
	sgs('hl',loc.id);
	update_status();
}

function is_sighthere(sight)
{
	if (('/' + heroloc().sights).indexOf('/'+sight+'::')!=-1) {it = '' + sight; return true;}
	for(var p=1;p<=NUM_CHRS;++p)
		if(Person[p].sights && personloc(Person[p])==heroloc() &&
		('/' + Person[p].sights).indexOf('/'+sight+'::')!=-1)
			{it = '' + sight; return true;}

	// don't change "it" after all
}

function inc_score()
{
	sgs('sc',parseInt(gs('sc'))+1);
	update_status();
}

// Initialise game

function start()
{
	winner = false;

	sgs('gameover',0);
	sgs('sc',0);

	Game_state = '';
	setGameHash();
	document.getElementById('outDiv').innerHTML = INTRO.split('\n').join('<br/>');
	TRANSCRIPT = INTRO.split('\n').join('<br/>');

	document.getElementById('textIn').value = '';
	document.getElementById('textIn').focus();

	set_gameflags();

	for(var i=1;i<=NUM_CHRS;++i)
		set_personloc(Person[i],Person[i].firstplace);
	
	set_heroloc(START_LOC);

	for(var i=1;i<=NUM_THNG;++i)
	{
		set_thingloc(Thing[i],Thing[i].firstplace);
		sgs('I_' + i, 0);
	}

	look();
	initialiseGame();
}

function die(msg) {
	if(gs('gameover')!=1) {
		DEATHSTRING = msg;
		sgs('gameover',1);
		say(msg +
	  '\n\n*** Nice try, old sport. ***\n' +
	  'You completed ' + sc_percent() + '% of this adventure.  (Type RESTART GAME to start from the beginning, or UNDO to go back one step.)');
		update_status();
	}
}


function win()
{
	if(gs('gameover')!=1)
	{
		sgs('gameover',1);
		say( '\n\n*** You win!  Jolly good, old sport! ***\n' +
	  'You completed ' + sc_percent() + '% of this adventure.  Congratulations!');
		update_status();
	}
}


/*
 *
 * tokeniser and pseudo-NLP
 * (actually all it does is skip unrecognised words sometimes,
 * and merge similar words together sometimes -
 * this can make it seem to understand surprisingly clever
 * sentences, but it's just as much at home with
 * ADVENT style pseudo-English)
 *
 */

var IS_METACOMMAND = false;

function take_command(command, suppressEcho)
{
	if(!suppressEcho)
		say('<font color="' + INPUT_COLOUR + '">\n\n&gt; <b>' + command.replace('\n', '') + '</b></font>\n');

	if(!suppressEcho)
	{
		push_command_history(command.replace('\n', ''));
		CommandHistoryPointer = 0;
	}
	
	// debugging aid - hide in live release
	if(false && command.charAt(0)=='*')
	{
		eval(command.substring(1,command.length));
		return;
	}
	

	
	for(var i=1;i<=MAX_TOKENS;++i)
		Token[i]='';

	tokenise(command);
	set_pronouns();
	if(DEBUG)
		alert('Token_str is ' + Token_str);

// not good, as some unrecognised commands will still be ignored
// with no message
//
//	if(Token_str=='' && last_cmd!='')
//		say('Sorry, I didn\'t understand that command.');
//	else
//		obey();

	IS_METACOMMAND = false;
	obey();
	
	// special things to do
	if((!IS_METACOMMAND) && gs('gameover')!=1)
		anywhere_do();
	
	// mannerisms of any characters that happen to be present
	for(var i = 1; i <= NUM_CHRS; ++i)
	{
		if(gs('gameover')!=1 && Person[i].mannerisms != '' && personloc(Person[i]) == heroloc() && pick(MANNER_FREQ) == 0 && !is_personname(Token[1]) && Token[1] != "talk" && Token[1] != "hello" && !IS_METACOMMAND)	{
			var mannersA = Person[i].mannerisms.split('/');
			say('\n' + mannersA[pick(mannersA.length)]);
		}
	}
}

function set_pronouns()
{
	for(var i=1;i<=MAX_TOKENS;++i)
		if(is_thingname(Token[i]))
		{
			it = eval(Token[i]);
			break;
		}
	for(var i=1;i<=MAX_TOKENS;++i)
		if(is_personname(Token[i]))
		{
			him = eval(Token[i]);
			break;
		}
}

function tokenise(command)
{
	command = command.toLowerCase();

	// change all non-alphanumeric characters to spaces
	var newCommand = '';
	for(var i=0; i < command.length; ++i)
	{
		newCommand += ALPHANUMERICS.indexOf(command.charAt(i))==-1 ? ' ' :
					  command.charAt(i)
	}
	command = newCommand;

	while(ALPHANUMERICS.indexOf(command.charAt(command.length-1))==-1)
		command = command.substring(0,command.length-1);
	while(ALPHANUMERICS.indexOf(command.charAt(0))==-1 && command.length>0)
		command = command.substring(1,command.length);
		
	last_cmd = command;
	
	var tkn_ptr = 1;
	var done=false;
	while(!done && tkn_ptr<=MAX_TOKENS)
	{
	
		while(ALPHANUMERICS.indexOf(command.charAt(0))==-1)
		{
			command=command.substring(1,command.length);
		}
	
		if(command=='')
			done=true;
	
		var this_token = '';
	
		if(command.indexOf(' ')==-1)
		{
			this_token = command;
			done = true;
		}
		else
		{
			this_token = command.substring(0,command.indexOf(' '));
			command=command.substring(command.indexOf(' ')+1,command.length);
		}
		
		var sensical = false;
		for(var i=1;i<=NUM_SYNS;++i)
			if(this_token!=''&&Synonyms[i].indexOf('.'+this_token+'.')!=-1)
			{
				sensical = true;
				this_token = Synonyms[i].substring(0,Synonyms[i].indexOf('.'));
			}
		
		// another try for plurals
		if(!sensical && this_token.length > 3 && this_token.charAt(this_token.length-1)=='s')
		{
			this_token = this_token.substring(0,this_token.length-1);
			for(var i=1;i<=NUM_SYNS;++i)
				if(this_token!=''&&Synonyms[i].indexOf('.'+this_token+'.')!=-1)
				{
					sensical = true;
					this_token = Synonyms[i].substring(0,Synonyms[i].indexOf('.'));
				}
		}

		//Disambiguate last names
		if (this_token == "buchanan" && Token[tkn_ptr-1] == "mister") { Token[tkn_ptr-1] = "tom"; }
		if (this_token == "buchanan" && Token[tkn_ptr-1] == "miss") { Token[tkn_ptr-1] = "daisy"; }
		if (this_token == "wilson" && Token[tkn_ptr-1] == "mister") { Token[tkn_ptr-1] = "george"; }
		if (this_token == "wilson" && Token[tkn_ptr-1] == "miss") { Token[tkn_ptr-1] = "myrtle"; }
		if (this_token == "boy" && Token[tkn_ptr-1] == "elevator") { Token[tkn_ptr-1] = "boy"; }
		
		// substitute nouns for pronouns
		if(this_token=='it')
		{
			if(it==0)
				sensical = false
			else if(it.fullname) // not if "it" is a string (i.e. a sight)
			{

				say('([[it.fullname]])\n');

				this_token = it.name;
			}
			else // "it" is the name of some scenery
			{
				say('(the ' + it + ')\n');
				this_token = it;
			}
		}
		else if(this_token=='him')
		{
			if(him==0)
				sensical = false
			else
				this_token = him.name;
		}
		
		// ignore token if it the same as the last one
		if(tkn_ptr > 1 && this_token==Token[tkn_ptr-1])
			sensical = false;
			
		// special - ignore 'up' after 'pick'...
		if(tkn_ptr > 1 && this_token=='up' && Token[tkn_ptr-1]=='take')
			sensical = false
		// ...'down' after 'put'...
		else if(tkn_ptr > 1 && this_token=='down' && Token[tkn_ptr-1]=='drop')
			sensical = false
		// ... 'up' after 'wake'...
		else if(tkn_ptr > 1 && this_token=='up' && Token[tkn_ptr-1]=='wake')
			sensical = false;
		// ... 'up' after 'fill'...
		else if(tkn_ptr > 1 && this_token=='up' && Token[tkn_ptr-1]=='fill')
			sensical = false;
		// ... 'out' after 'empty'
		else if(tkn_ptr > 1 && this_token=='out' && Token[tkn_ptr-1]=='empty')
			sensical = false;

		// run primary compass directions together into secondary ones
		if(tkn_ptr > 1 && this_token=='east' && Token[tkn_ptr-1]=='north') {
			Token[tkn_ptr-1] = 'northeast';
			sensical = false;
		}
		else if(tkn_ptr > 1 && this_token=='west' && Token[tkn_ptr-1]=='north') {
			Token[tkn_ptr-1] = 'northwest';
			sensical = false;
		}
		else if(tkn_ptr > 1 && this_token=='east' && Token[tkn_ptr-1]=='south') {
			Token[tkn_ptr-1] = 'southeast';
			sensical = false;
		}
		else if(tkn_ptr > 1 && this_token=='west' && Token[tkn_ptr-1]=='south') {
			Token[tkn_ptr-1] = 'southwest';
			sensical = false;
		}
		// change 'put on' to 'wear'...
		else if(tkn_ptr > 1 && this_token=='on' && Token[tkn_ptr-1]=='drop') {
			Token[tkn_ptr-1] = 'wear';
			sensical = false;
		}
		// change 'put X in' to 'insert X'...
		else if(tkn_ptr > 2 && this_token=='in' && Token[tkn_ptr-2]=='drop') {
			Token[tkn_ptr-2] = 'insert';
			sensical = false;
		}
		// 'put X on' to 'wear X'
		else if(tkn_ptr > 2 && this_token=='on' && Token[tkn_ptr-2]=='drop') {
			Token[tkn_ptr-2] = 'wear';
			sensical = false;
		}
		// ...'take off' to 'remove'...
		else if(tkn_ptr > 1 && this_token=='off' && Token[tkn_ptr-1]=='take') {
			Token[tkn_ptr-1] = 'remove';
			sensical = false;
		}
		// 'take X off' to 'remove X'
		else if(tkn_ptr > 2 && this_token=='off' && Token[tkn_ptr-2]=='take') {
			Token[tkn_ptr-2] = 'remove';
			sensical = false;
		}
		// ...'look in' to 'open'...
		else if(tkn_ptr > 1 && this_token=='in' && Token[tkn_ptr-1]=='look') {
			Token[tkn_ptr-1] = 'open';
			sensical = false;
		}
		// ...'move <direction>' to <direction>
		else if(tkn_ptr > 1 && DIRECTIONS.indexOf(this_token+'.')!=-1 && Token[tkn_ptr-1]=='move') {
			Token[tkn_ptr - 1] = this_token;
			sensical = false;
		}
		// ...'look out <thing>' to 'look <thing>'
		else if (tkn_ptr > 1 && this_token == "out" && Token[tkn_ptr-1] == "look" && Token[tkn_ptr+1] != 0) {
			sensical = false;
		}
		// ...'blow out <thing>' to 'blow <thing>'
		else if (tkn_ptr > 1 && this_token == "out" && Token[tkn_ptr-1] == "blow" && Token[tkn_ptr+1] != 0) {
			sensical = false;
		}
		// 'get drunk' to 'drink wine' (since get -> take and drunk -> drunkard, this will be a bit wild)
		// Might be a little awkward if someone wants to literally take the drunkard...
		else if (tkn_ptr > 1 && this_token == "drunkard" && Token[tkn_ptr-1] == "take") {
			this_token = "wine";
			Token[tkn_ptr-1] = "drink";
		}
	
		// special - accept anything as token 2 if token 1 is load or save
		if(tkn_ptr==2 && (Token[1]=='save'||Token[1]=='load'||Token[1]=='delete'))
			sensical = true;

		// ignore certain words, and all words of three letters or less that haven't
		// been recognised already
		// always ignore an unrecognised word if the last word was also unrecognised.
		if(	(!sensical && this_token.length <= 3) ||
			('.' + WORDS_TO_IGNORE + '.').indexOf('.' + this_token + '.')!=-1
		  )
		{
			sensical = false;
		}
		else if(!sensical && tkn_ptr > 1 && Token[tkn_ptr - 1] != 'xxxxx')
		{
			// this token is meaningless, but should be treated as a word IF IT'S LAST.
			this_token = 'xxxxx';

			// due to the Eliza effect, we get a more effective-seeming parser
			// if we DON'T complain about unrecognised words.
//			say('[I don\'t know the word "' + this_token + ']');
			
			sensical = true;
		}

		// ignore last token if it was a 'meaningless' word (Eliza)
		if(sensical && Token[tkn_ptr - 1]=='xxxxx')
			tkn_ptr -= 1;

		if(sensical)
		{
			Token[tkn_ptr++] = this_token;
			if(is_sighthere(this_token))
				it = this_token;
		}


	}
	
	Token_str = '';
	for(var i=1;i<=MAX_TOKENS;++i)
	{
		if(Token[i]!='')
			Token_str += Token[i]+'.';
	}
	
	while(Token_str.charAt(Token_str.length-1)=='.')
	{
		Token_str=Token_str.substring(0,Token_str.length-1);
	}
}


// random number 0 to n-1
function pick(n)
{
	return(Math.floor(Math.random()*n));
}

// capitalise 'text' to 'Text'
function capitalise(txt)
{
	if(txt=='')
		return('')
	else
		return(txt.charAt(0).toUpperCase() + txt.substring(1,txt.length));
}

// wear and remove wearable things
function wear(th)
{
	if(Token[3]) // kludge - flow ends up here after 'PUT X ON Y', (if X is wearable) which isn't implemented
	{
		say('Sorry, you can\'t do that.');
		return false;
	}
	
	if(!in_inv(th))
	{
		say('You are not carrying the ' + th.name + '.');
		return(false);
	}
	
	if(!th.wearable)
	{
		say('You can\'t wear the ' + th.name + '!')
		return(false);
	}
	
	if(worn(th))
	{
		say('You are already wearing the ' + th.name + '.');
		return(true);
	}
	
	sgs('wrn_' + th.id,1);
	say('Okay. You are wearing the ' + th.name + '.');
	return(true);
}

function unwear(th)
{
	if(!in_inv(th))
	{
		say('You are not even carrying the ' + th.name + '!');
		return false;
	}

	if(!(th.wearable))
	{
		say('You can\'t wear or remove the ' + th.name + '.');
		return false;
	}
	
	if(!worn(th))
	{
		say('You are not wearing the ' + th.name + '.');
		return false;
	}
		
	sgs('wrn_' + th.id,0);
	say('Okay. You are no longer wearing the ' + th.name + '.');
	return(true);
}

// is th being worn?
function worn(th)
{
	return(gs('wrn_' + th.id)==1);
}

// send a person to sleep
function sleep(ch)
{
	sgs('slp_' + ch.id, 1);
}

function unsleep(ch)
{
	sgs('slp_' + ch.id, 0);
}

function asleep(ch)
{
	return(gs('slp_' + ch.id)==1)
}

// first word of a string
function firstword(str)
{
	return(str.split(' ')[0]);
}

/*
 * game state handler
 *
 * Game state is kept in TWO places: a string, Game_state, and a hash, StateHash.
 * When writing, which happens less often than reading, the string and the hash are
 * BOTH changed.
 * When reading, only the string is read.
 * The string is what gets written to saved-game cookies and undo history.
 * After an UNDO or RESTORE, the hash is updated from the string.
 *
 */

function gs(name)
{
	// restore from string only
	if(StateHash[name])
		return StateHash[name]
	else
		return 0;
	
//	var states = Game_state.split('.');
//	for(var i=0;i<states.length;++i)
//		if(states[i].split('-')[0]==name)
//			return(states[i].split('-')[1]);
//
//	return(0);
}

function sgs(name,value)
{
	// store in hash and string
	if(value==0 || value=='0')
		delete StateHash[name]
	else
		StateHash[name] = value;
	
	var states = Game_state.split('.');
	for(var i=0;i<states.length;++i)
		if(states[i].split('-')[0]==name)
		{
			states[i]='';
		}

	Game_state = states.join('.');
	
	if(value==0)
		return;
	
	if(Game_state.indexOf('..')!=-1)
		Game_state = Game_state.substring(0,Game_state.indexOf('..')) +
		  Game_state.substring(Game_state.indexOf('..')+1,Game_state.length);

	Game_state = name + '-' + value + '.' + Game_state;
}

function setGameHash()
{
	StateHash = new Object;
	
	// rebuild the state hash from the Game_state string.
	// This must be called after a RESTORE or UNDO.
	var hashEntries = Game_state.split('.')
	for(var i=0; i < hashEntries.length; ++i)
	{
		var thisEntry = hashEntries[i].split('-');
		var hashName = thisEntry[0];
		var hashValue = thisEntry[1];
		
		if(!( hashValue == 0 || hashValue == '0' ))
			StateHash[hashName] = hashValue;
	}
}

/*
 *
 * save and load to cookies
 *
 */

// todo - allow player to list and delete SGM cookies

function save(name)
{
	if(name=='')
	{
		say('Please name your file - type SAVE (NAME).');
		return;
	}
	
	else {
		var foundit = false;
		var cookies = document.cookie.split(';');
		for(var i=0;i<cookies.length;++i) {
			if(cookies[i].indexOf('SGM_' + GAME_ID + '_' + name.toUpperCase() + '=')!=-1) {
				foundit = true;
				break;
			}
		}
	
	if(!foundit) {
	savegamedata = 'SGM_' + GAME_ID + '_' + name.toUpperCase() + '=' + Game_state + ';expires=' + new Date( new Date().setYear(1 + new Date().getFullYear()) ).toGMTString() + ';' ;
	document.cookie = savegamedata;
	
	say('Game saved to cookie ' + name.toUpperCase() + '.\n\
Type LOAD ' + name.toUpperCase() + ' to carry on from where you just saved.'
	);
	}
	else {
		say('Cookie ' + name.toUpperCase() + ' already exists.  Type OVERWRITE to overwrite it.  Type SAVE (OTHER) to save as a different name.');
	}}}

function override(name)
{
	if(name=='')
	{
		say('You cannot directly overwrite, you must type SAVE (GAME) first, and then type OVERWRITE.');
		return;
	}
	
	else if (stored_name == '') {
		say('No file to overwrite.');
	}
		
	savegamedata = 'SGM_' + GAME_ID + '_' + name.toUpperCase() + '=' + Game_state + ';expires=' + new Date( new Date().setYear(1 + new Date().getFullYear()) ).toGMTString() + ';' ;
	document.cookie = savegamedata;
	stored_name = '';
	
	say('Game saved to cookie ' + name.toUpperCase() + '.\n\
Type LOAD ' + name.toUpperCase() + ' to carry on from where you just saved.'
	);
	}
		
function delete_cookie(name)
{
	if(name=='')
	{
		say('Please name your cookie - type DELETE (NAME).\n\
(Type DIR to see a list of cookies.)');
		return;
	}
	
	if(!document.cookie)
	{
		say('No cookies found, sorry.');
		return;
	}

	var foundit = false;

	var cookies = document.cookie.split(';');
	for(var i=0;i<cookies.length;++i)
	{
		if(cookies[i].indexOf('SGM_' + GAME_ID + '_' + name.toUpperCase() + '=')!=-1)
		{
			foundit = true;
			break;
		}
	}
	
	if(!foundit)
	{
		say('Cookie ' + name.toUpperCase() + ' not found, sorry.\n\
(Type DIR to see a list of cookies.)');
	}
	else
	{
		rmck('SGM_' + GAME_ID + '_' + name.toUpperCase());
		say('Cookie ' + name.toUpperCase() + ' deleted.');
	}
}

function load(name)
{
	if(name=='')
	{
		say('Please name your cookie - type RESTORE (NAME).\n\
(Type DIR to see a list of cookies.)');
		return;
	}

	if(!ck('SGM_' + GAME_ID + '_' + name.toUpperCase()))
	{
		say ('Cookie ' + name.toUpperCase() + ' not found, sorry.\n\
(Type DIR to see a list of cookies.)');
		return;
	}

	Game_state = ck('SGM_' + GAME_ID + '_' + name.toUpperCase());
	setGameHash();
	say('Restored game from cookie ' + name.toUpperCase() + '.  Type LOOK to see where you are.');
	update_status();
}

function list_cookies()
{
	var txt = '';
	
	var cookies = document.cookie.split('; ');
	for (var i=0;i<cookies.length;++i)
		if(cookies[i].split('=')[0].indexOf('SGM_' + GAME_ID)==0)
			txt += '\n' + cookies[i].split('=')[0].substring(8,cookies[i].split('=')[0].length);
	
	if(txt=='')
		say('No cookies found.')
	else
		say('Cookies found:' + txt);
}

/*
 *
 * cookie handler
 * cribbed from any JS textbook
 *
 */

function ck(name)
{
	var cookies = document.cookie.split('; ');
	for(i=0;i<cookies.length;++i)
		if(cookies[i].split('=')[0]==name)
			return(cookies[i].split('=')[1]);
	
	return(0);
}

function sck(name,val)
{
	document.cookie = name + '=' + val ;
}

function rmck(name)
{
	var expires = new Date;
	expires.setDate(expires.getDate() - 1);
	
	document.cookie = name + '=;expires=' +
	  expires.toGMTString();
}

//Cheats
function narrative_jump() {
	if (gs("tom_booked") == 0) { inc_score(); }
	if (gs("phone_answered") == 0) { inc_score(); }
	if (gs("key_inc_score") == 0) { inc_score(); }
	if (gs("note_call") == 0) { inc_score(); }
	if (gs("gatsby_first") == 0) { inc_score(); }
	
	set_personloc(gatsby, nowhere);
	set_personloc(daisy,nowhere);
	set_personloc(jordan,nowhere);
	set_personloc(tom,buchsitting);
	
	set_thingloc(book, nowhere);
	
	give_hero(note);
	give_hero(ticket);
	give_hero(key);
	
	sgs("tom_booked", 1);
	sgs("tom_ticket",1);
	sgs("jordan_daisy_convo",1);
	sgs("key_inc_score", 1);
	sgs("note_call", 1);
	sgs("phone_answered",1);
	
	if (gs("gatsby_first") == 0) {
		say("You see Gatsby staring out into the beach at the green light, minute and far away, on the dock across the shore.  You think to talk to Gatsby, a man you've always admired but haven't yet met, but you decide against it, thinking he looks more comfortable alone.  He then stretches his arms out to the water toward the green light on the shore.  You look at the light, and by the time you look back at Gatsby, he's gone.\n\nYou decide to go home and sleep for the night.  You wake up the next morning, refreshed, ready to go see Tom in New York.\n\n<i><font color=\"" + HIGHLIGHT_COLOUR + "\">=== CHAPTER TWO: MONDAY ===</font></i>\n\n");
		sgs("gatsby_first",1);
		set_heroloc(outsidechrhouse);
		sent_look = true;
		look();
	}
	else {
		if (gs("score_from_train") == 0) { inc_score(); sgs("score_from_train",1); }
		if (gs("party_wine") == 0) { inc_score(); }
		if (gs("party_ice") == 0) { inc_score(); }
		if (gs("party_is_go") <= 3) { inc_score(); }
		if (gs("score_from_drive") == 0) { inc_score(); }

		set_personloc(tom,nowhere);
		set_personloc(landlord, nowhere);
		set_personloc(george,wilsgarage);
		set_personloc(tom, aptelevator2);
		set_personloc(myrtle, nowhere);
		set_personloc(catherine, nowhere);
		set_personloc(drunkard, ashpolice);
		unsleep(drunkard);

		set_thingloc(vase,nowhere);
		set_thingloc(flower,nowhere);
		set_thingloc(ice,nowhere);

		take_away(wine);
		take_away(vase);
		take_away(flower);
		take_away(ice);
		take_away(wrench);

		sgs("buchhouselock",1);
		sgs("party_is_go",4);
		sgs("drunkard_jailed",1);
		sgs("landlord_ready",1);
		sgs("elevator_authorized",1);
		sgs("speakeasypw",2);
		sgs("catherine",4);
		sgs("tom_talks_about_wilson",1);
		sgs("wilson_tom_convo",1);
		sgs("myrtle_enter",2);
		sgs("myrtle_enter",1);
		sgs("tom_talks_about_ashes",1);
		sgs('seendrunkard',1);
		sgs("vase_watered",1);
		sgs("vase_flowered",1);
		sgs("gambled",1);
		sgs("apt_talk",2);
		sgs("score_from_drive",1);
		sgs("buchhouselock",1);
		sgs("party_is_go",4);

		say(tom_elevator_talk); // Should take place in the elevator.  Speech is in variables.js.
		set_personloc(tom, nowhere);
		set_personloc(butler, outsidechrhouse);
		set_personloc(jordan, gtsbybeach);
		set_personloc(catherine, gtsbyorchestra);
		set_heroloc(chrbedroom);
		
		sent_look = true;
		look();
	}
}
