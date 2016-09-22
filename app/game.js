var enemyAttackDamage = 0,
	lightningDashDamage = 0,
	fireFistsDamage = 0,
	slideTackleDamage = 0,
	selfDefibrillationHeal = 0,
	Coins = 0,
	possHealsLeft = 13,
	healsLeft = 13,
	slideTackleUsesLeft = 20,
	fireFistsUsesLeft = 10,
	lightningDashUsesLeft = 15,
	possSlideTackleUsesLeft = 20,
	possFireFistsUsesLeft = 10,
	possLightningDashUsesLeft = 15,
	livesLeft = 3,
	hit = 0;

/* ------------------------------------------------------=====Shop & Leveling=====------------------------------------------------------ */

var shop = document.getElementById("shop");

var playerLevel = 1;
var possPlayerHealth = 0;
var playerName = "";

function getPlayerName() {

	playerName = document.getElementById("playerName").value;

	if (playerName.length <= 0) {

		alert("Please type a name!");
	} else {

		document.getElementById("playerName").setAttribute("readonly", "");
		document.getElementById("confirmName").parentNode.removeChild(document.getElementById("confirmName"));
	};
};

function possPlayerHealthCounter() {

		possPlayerHealth = playerLevel * 35;
	};

var playerHealth = possPlayerHealth;
var	possEnemyHealth = Math.floor(Math.random() * (possPlayerHealth - 4) + 4);
var enemyHealth = 0;

function checkEnemyHealth() {

		if (possEnemyHealth <= (possPlayerHealth - 3)){

		possEnemyHealth = Math.floor(Math.random() * (possPlayerHealth - (possPlayerHealth - 3)) + (possPlayerHealth - 3));
		checkEnemyHealth();
	} else {
		enemyHealth = possEnemyHealth;
	};
};

var	XP = 0,
	neededXP = 50,
	Attack = 5,
	Defense = 4,
	Agility = 1;

function levelUp() {

	if (XP >= neededXP){
		
		playerLevel += 1;
		document.getElementById("log").value += "\n[Log]: Congratulations! You earned " + neededXP + "XP points to reach level " + playerLevel + "!";
		neededXP = Math.floor(neededXP * 1.30);
		XP = 0;
		Attack += 1;
		Defense += 1;
		Agility += 2;
		Coins += 1;
		possPlayerHealthCounter();
		playerHealth = possPlayerHealth;
		playerHealthCounter();
		XPercentCounter();
		document.getElementById("playerLevel").innerHTML = "Level: " + playerLevel;
		document.getElementById("playerAttack").innerHTML = "Attack: " + Attack;
		document.getElementById("playerDefense").innerHTML = "Defense: " + Defense;
		document.getElementById("playerAgility").innerHTML = "Agility: " + Agility;
		scroller();
	} else {};
};

function buyHeals() {

	if (Coins >= 3){

		possHealsLeft += 2;
		healsLeft = possHealsLeft;
		Coins -= 3;
		coinCounter();
		healsLeftCounter();
		document.getElementById("log").value += "\n[Shop]: Your transaction was successful";
		scroller();

	} else {

		document.getElementById("log").value += "\n[Shop]: You don't have enough coins to purchase that item!";
		scroller();
	};
};

function increaseAttackCap() {

	if (Coins >= 7) {

		Coins -= 7;
		possSlideTackleUsesLeft += 3;
		possFireFistsUsesLeft += 3;
		possLightningDashUsesLeft += 3;
		slideTackleUsesLeft = possSlideTackleUsesLeft;
		fireFistsUsesLeft = possFireFistsUsesLeft;
		lightningDashUsesLeft = possLightningDashUsesLeft;
		document.getElementById("log").value += "\n[Shop]: Your transaction was successful";
		scroller();
		moveCounter();
		coinCounter();
	} else {

		document.getElementById("log").value += "\n[Shop]: You don't have enough coins to purchase that item!";
		scroller();
	};
};
/* ------------------------------------------------------=====Account=====------------------------------------------------------ */

/* ------------------------------------------------------=====Story=====------------------------------------------------------ */

var story;

function writeStory() {

	document.getElementById("gamescape").innerHTML = "story";
};

/* ------------------------------------------------------=====Game Mechanincs=====------------------------------------------------------ */

function startBattle() {
        possPlayerHealthCounter();
        checkEnemyHealth();
        playerHealth = possPlayerHealth;
        enemyHealth = possEnemyHealth;
        healsLeft = possHealsLeft;
        lightningDashUsesLeft = possLightningDashUsesLeft;
        fireFistsUsesLeft = possFireFistsUsesLeft;
        slideTackleUsesLeft = possSlideTackleUsesLeft;
        unmuteAttacks();
        coinCounter();
		document.getElementById("continueRestartButton").setAttribute("onclick", "");
		document.getElementById("startButton").setAttribute("onclick", "");
		document.getElementById("continueRestartButton").value = "";
		document.getElementById("startButton").value = "";
		document.getElementById("saveGameButton").removeAttribute("disabled");
		document.getElementById("loadGameButton").removeAttribute("disabled");
		playerHealthCounter();
		enemyHealthCounter();
		healsLeftCounter();
		document.getElementById("log").value = "";
};

function continueGame() {
        possPlayerHealthCounter();
        playerHealthCounter();
        checkEnemyHealth();
        enemyHealth = possEnemyHealth;
        enemyHealthCounter();
        lightningDashUsesLeft = possLightningDashUsesLeft;
        fireFistsUsesLeft = possFireFistsUsesLeft;
        slideTackleUsesLeft = possSlideTackleUsesLeft;
        healsLeft = possHealsLeft;
		document.getElementById("continueRestartButton").setAttribute("onclick", "");
		document.getElementById("continueRestartButton").value = "";
		document.getElementById("enemyHealthDisplay").innerHTML = "Enemy Health: " + enemyHealth + "/" + possEnemyHealth + "HP";
		document.getElementById("playerHealthDisplay").innerHTML = "Your Health: " + playerHealth + "/" + possPlayerHealth + "HP";
		document.getElementById("log").value = "";
		healsLeft = possHealsLeft;
		healsLeftCounter();
		unmuteAttacks();
};

function muteAttacks() {

	document.getElementById("choiceButton1").setAttribute("disabled", "");
	document.getElementById("choiceButton2").setAttribute("disabled", "");
	document.getElementById("choiceButton3").setAttribute("disabled", "");
	document.getElementById("choiceButton4").setAttribute("disabled", "");

};

function unmuteAttacks() {

	document.getElementById("choiceButton1").removeAttribute("disabled");
	document.getElementById("choiceButton4").removeAttribute("disabled");
	if (playerLevel >= 2) {

	document.getElementById("choiceButton2").removeAttribute("disabled");
	} else {};

	if (playerLevel >= 4) {

	document.getElementById("choiceButton3").removeAttribute("disabled");
	} else {};
};

function playerHealthCounter() {

	if (playerHealth <= 0) {
		playerHealth = 0;
		muteAttacks();
		livesLeftCounter();
		document.getElementById("playerHealthDisplay").innerHTML = "Your Health: 0 (You Died!)";
		document.getElementById("continueRestartButton").value = "Restart?";
		document.getElementById("continueRestartButton").setAttribute("onclick", "startBattle()");
		saveGame();
	} else {};
		document.getElementById("playerHealthDisplay").innerHTML = "Your Health: " + playerHealth + "/" + possPlayerHealth + "HP";
	if (playerHealth >= possPlayerHealth + 1) {
		playerHealth = possPlayerHealth;

		playerHealthCounter();
	};
};

function enemyHealthCounter() {

	if (enemyHealth <= 0) {
		enemyHealth = 0;
		levelUp();
		muteAttacks();
		fireFistsUsesLeft = 10;
		Coins += Math.floor(Math.random() * (5 - 1) + 1);
		XP += playerLevel + 15 + Math.floor(Math.random() * playerLevel);
		document.getElementById("enemyHealthDisplay").innerHTML = "Enemy Health: 0 (You killed the enemy!)";
		document.getElementById("continueRestartButton").value = "Continue?";
		document.getElementById("continueRestartButton").setAttribute("onclick", "continueGame()");
		XPercentCounter();
		moveCounter();
		coinCounter();
		levelUp();
	} else {};
		document.getElementById("enemyHealthDisplay").innerHTML = "Enemy Health: " + enemyHealth + "/" + possEnemyHealth + "HP";
};

function coinCounter() {

	document.getElementById("coinCounter").innerHTML = "Coins: " + Coins;
};

function healsLeftCounter() {

	moveCounter();
};

function challengeBoss() {

	if (playerLevel >= 20){
		possEnemyHealth = possPlayerHealth * 2;
		enemyHealth = possEnemyHealth;
		enemyHealthCounter();
	} else {
		document.getElementById("log").value += "\n[Log]: You are not a high enough level to challenge the boss at this time...";
	};
};

function scroller() {
	var log = document.getElementById("log");
	log.scrollTop = log.scrollHeight;
};

function healUseCounter() {

	if (healsLeft > 0) {

		healsLeft -= 1;
		selfDefibrillation();
	} else {
		healsLeft = 0;
		document.getElementById("log").value += "\n [Log]: You do not have enough charges left to heal yourself!";
	};
	moveCounter();
	scroller();
};

function livesLeftCounter() {

	livesLeft -= 1;
	document.getElementById("livesLeft").innerHTML = "Lives Left: " + livesLeft;
	if (livesLeft <= 0) {

		playerLevel = 1;
		livesLeft = 3;
		document.getElementById("log").value += "\n[Log]: You ran out of Lives! You have been set back to level 1."
	} else {};
};

function XPercentCounter() {

	var XPercent = (Math.round(XP/neededXP * 100)) + "%";
	document.getElementById("playerXP").innerHTML = "XP: " + XP + "/" + neededXP + " (" + XPercent + ")";
	};

function selectSlot() {

	if (document.getElementById("saveSlotChanger").value == 3) {

		document.getElementById("saveGameButton").setAttribute("onclick","saveSlot3()");
		document.getElementById("loadGameButton").setAttribute("onclick","loadSlot3()");
		document.getElementById("log").value += "\n[Saved]: Switched to save slot 3.";
	} else if (document.getElementById("saveSlotChanger").value == 2) {

		document.getElementById("saveGameButton").setAttribute("onclick","saveSlot2()");
		document.getElementById("loadGameButton").setAttribute("onclick","loadSlot2()");
		document.getElementById("log").value += "\n[Saved]: Switched to save slot 2.";
	} else {

		document.getElementById("saveGameButton").setAttribute("onclick","saveSlot1()");
		document.getElementById("loadGameButton").setAttribute("onclick","loadSlot1()");
		document.getElementById("log").value += "\n[Saved]: Switched to save slot 1.";
	};
};

function saveSlot1() {
	
	localStorage.setItem("PLAYERNAME1", playerName);
	localStorage.setItem("PLAYERLEVEL1", playerLevel);
	localStorage.setItem("PLAYERPOSSHEALTH1", possPlayerHealth);
	localStorage.setItem("ENEMYPOSSHEALTH1", possEnemyHealth);
	localStorage.setItem("PLAYERATTACK1", Attack);
	localStorage.setItem("PLAYERDEFENSE1", Defense);
	localStorage.setItem("PLAYERAGILITY1", Agility);
	localStorage.setItem("PLAYERCOINS1", Coins);
	localStorage.setItem("PLAYERHEALSLEFT1", healsLeft);
	localStorage.setItem("PLAYERPOSSHEALS1", possHealsLeft);
	localStorage.setItem("PLAYERLIVESLEFT1", livesLeft);
	localStorage.setItem("PLAYERXPNEEDED1", neededXP);
	localStorage.setItem("PLAYERXP1", XP);
	document.getElementById("log").value += "\n[Saved]: Successfully saved game to slot 1.";
	scroller();
};

function saveSlot2() {
	
	localStorage.setItem("PLAYERNAME2", playerName);
	localStorage.setItem("PLAYERLEVEL2", playerLevel);
	localStorage.setItem("PLAYERPOSSHEALTH2", possPlayerHealth);
	localStorage.setItem("ENEMYPOSSHEALTH2", possEnemyHealth);
	localStorage.setItem("PLAYERATTACK2", Attack);
	localStorage.setItem("PLAYERDEFENSE2", Defense);
	localStorage.setItem("PLAYERAGILITY2", Agility);
	localStorage.setItem("PLAYERCOINS2", Coins);
	localStorage.setItem("PLAYERHEALSLEFT2", healsLeft);
	localStorage.setItem("PLAYERPOSSHEALS2", possHealsLeft);
	localStorage.setItem("PLAYERLIVESLEFT2", livesLeft);
	localStorage.setItem("PLAYERXPNEEDED2", neededXP);
	localStorage.setItem("PLAYERXP2", XP);
	document.getElementById("log").value += "\n[Saved]: Successfully saved game to slot 2.";
	scroller();
};

function saveSlot3() {
	
	localStorage.setItem("PLAYERNAME3", playerName);
	localStorage.setItem("PLAYERLEVEL3", playerLevel);
	localStorage.setItem("PLAYERPOSSHEALTH3", possPlayerHealth);
	localStorage.setItem("ENEMYPOSSHEALTH3", possEnemyHealth);
	localStorage.setItem("PLAYERATTACK3", Attack);
	localStorage.setItem("PLAYERDEFENSE3", Defense);
	localStorage.setItem("PLAYERAGILITY3", Agility);
	localStorage.setItem("PLAYERCOINS3", Coins);
	localStorage.setItem("PLAYERHEALSLEFT3", healsLeft);
	localStorage.setItem("PLAYERPOSSHEALS3", possHealsLeft);
	localStorage.setItem("PLAYERLIVESLEFT3", livesLeft);
	localStorage.setItem("PLAYERXPNEEDED3", neededXP);
	localStorage.setItem("PLAYERXP3", XP);
	document.getElementById("log").value += "\n[Saved]: Successfully saved game to slot 3.";
	scroller();
};

function loadSlot1() {

	playerName = localStorage.getItem("PLAYERNAME1");
	playerLevel = parseInt(localStorage.getItem("PLAYERLEVEL1"));
	Attack = parseInt(localStorage.getItem("PLAYERATTACK1"));
	Defense = parseInt(localStorage.getItem("PLAYERDEFENSE1"));
	Agility = parseInt(localStorage.getItem("PLAYERAGILITY1"));
	Coins = parseInt(localStorage.getItem("PLAYERCOINS1"));
	healsLeft = parseInt(localStorage.getItem("PLAYERHEALSLEFT1"));
	possHealsLeft = parseInt(localStorage.getItem("PLAYERPOSSHEALS1"));
	livesLeft = parseInt(localStorage.getItem("PLAYERLIVESLEFT1"));
	XP = parseInt(localStorage.getItem("PLAYERXP1"));
	neededXP = parseInt(localStorage.getItem("PLAYERXPNEEDED1"));
	possPlayerHealth = parseInt(localStorage.getItem("PLAYERPOSSHEALTH1"));
	possEnemyHealth = parseInt(localStorage.getItem("PLAYERPOSSHEALTH1"));
	playerHealth = possPlayerHealth;
	healsLeft = possHealsLeft;
	enemyHealth = possEnemyHealth;
	playerHealthCounter();
	enemyHealthCounter();
	coinCounter();
	healsLeftCounter();
	document.getElementById("playerAttack").innerHTML = "Attack: " + Attack;
	document.getElementById("playerDefense").innerHTML = "Defense: " + Defense;
	document.getElementById("playerAgility").innerHTML = "Agility: " + Agility;
	document.getElementById("playerLevel").innerHTML = "Level: " + playerLevel;
	document.getElementById("playerXP").innerHTML = "XP: " + XP;
	document.getElementById("livesLeft").innerHTML = "Lives Left: " + livesLeft;
	document.getElementById("playerName").value = playerName;
	document.getElementById("log").value += "\n[Loaded]: Successfully loaded game from slot 1";
	unmuteAttacks();
	if (playerName.length <= 0) {

		alert("Please type a name!");
	} else {

		document.getElementById("playerName").setAttribute("readonly", "");
		document.getElementById("confirmName").parentNode.removeChild(document.getElementById("confirmName"));
	};
	scroller();
};

function loadSlot2() {

	playerName = localStorage.getItem("PLAYERNAME2");
	playerLevel = parseInt(localStorage.getItem("PLAYERLEVEL2"));
	Attack = parseInt(localStorage.getItem("PLAYERATTACK2"));
	Defense = parseInt(localStorage.getItem("PLAYERDEFENSE2"));
	Agility = parseInt(localStorage.getItem("PLAYERAGILITY2"));
	Coins = parseInt(localStorage.getItem("PLAYERCOINS2"));
	healsLeft = parseInt(localStorage.getItem("PLAYERHEALSLEFT2"));
	possHealsLeft = parseInt(localStorage.getItem("PLAYERPOSSHEALS2"));
	livesLeft = parseInt(localStorage.getItem("PLAYERLIVESLEFT2"));
	XP = parseInt(localStorage.getItem("PLAYERXP2"));
	neededXP = parseInt(localStorage.getItem("PLAYERXPNEEDED2"));
	possPlayerHealth = parseInt(localStorage.getItem("PLAYERPOSSHEALTH2"));
	possEnemyHealth = parseInt(localStorage.getItem("PLAYERPOSSHEALTH2"));
	playerHealth = possPlayerHealth;
	healsLeft = possHealsLeft;
	enemyHealth = possEnemyHealth;
	playerHealthCounter();
	enemyHealthCounter();
	coinCounter();
	healsLeftCounter();
	document.getElementById("playerAttack").innerHTML = "Attack: " + Attack;
	document.getElementById("playerDefense").innerHTML = "Defense: " + Defense;
	document.getElementById("playerAgility").innerHTML = "Agility: " + Agility;
	document.getElementById("playerLevel").innerHTML = "Level: " + playerLevel;
	document.getElementById("playerXP").innerHTML = "XP: " + XP;
	document.getElementById("livesLeft").innerHTML = "Lives Left: " + livesLeft;
	document.getElementById("playerName").value = playerName;
	document.getElementById("log").value += "\n[Loaded]: Successfully loaded game from slot 2";
	unmuteAttacks();
	if (playerName.length <= 0) {

		alert("Please type a name!");
	} else {

		document.getElementById("playerName").setAttribute("readonly", "");
		document.getElementById("confirmName").parentNode.removeChild(document.getElementById("confirmName"));
	};
	scroller();
};

function loadSlot3() {

	playerName = localStorage.getItem("PLAYERNAME3");
	playerLevel = parseInt(localStorage.getItem("PLAYERLEVEL3"));
	Attack = parseInt(localStorage.getItem("PLAYERATTACK3"));
	Defense = parseInt(localStorage.getItem("PLAYERDEFENSE3"));
	Agility = parseInt(localStorage.getItem("PLAYERAGILITY3"));
	Coins = parseInt(localStorage.getItem("PLAYERCOINS3"));
	healsLeft = parseInt(localStorage.getItem("PLAYERHEALSLEFT3"));
	possHealsLeft = parseInt(localStorage.getItem("PLAYERPOSSHEALS3"));
	livesLeft = parseInt(localStorage.getItem("PLAYERLIVESLEFT3"));
	XP = parseInt(localStorage.getItem("PLAYERXP3"));
	neededXP = parseInt(localStorage.getItem("PLAYERXPNEEDED3"));
	possPlayerHealth = parseInt(localStorage.getItem("PLAYERPOSSHEALTH3"));
	possEnemyHealth = parseInt(localStorage.getItem("PLAYERPOSSHEALTH3"));
	playerHealth = possPlayerHealth;
	healsLeft = possHealsLeft;
	enemyHealth = possEnemyHealth;
	playerHealthCounter();
	enemyHealthCounter();
	coinCounter();
	healsLeftCounter();
	document.getElementById("playerAttack").innerHTML = "Attack: " + Attack;
	document.getElementById("playerDefense").innerHTML = "Defense: " + Defense;
	document.getElementById("playerAgility").innerHTML = "Agility: " + Agility;
	document.getElementById("playerLevel").innerHTML = "Level: " + playerLevel;
	document.getElementById("playerXP").innerHTML = "XP: " + XP;
	document.getElementById("livesLeft").innerHTML = "Lives Left: " + livesLeft;
	document.getElementById("playerName").value = playerName;
	document.getElementById("log").value += "\n[Loaded]: Successfully loaded game from slot 3";
	unmuteAttacks();
	if (playerName.length <= 0) {

		alert("Please type a name!");
	} else {

		document.getElementById("playerName").setAttribute("readonly", "");
		document.getElementById("confirmName").parentNode.removeChild(document.getElementById("confirmName"));
	};
	scroller();
};

function moveCounter() {

	document.getElementById("choiceButton1").value = "SlideTackle " + slideTackleUsesLeft + "/" + possSlideTackleUsesLeft;
	document.getElementById("choiceButton2").value = "Lightning Dash " + lightningDashUsesLeft + "/" + possLightningDashUsesLeft;
	document.getElementById("choiceButton3").value = "Fire Fists " + fireFistsUsesLeft + "/" + possFireFistsUsesLeft;
	document.getElementById("choiceButton4").value = "Self-Defibrillation " + healsLeft + "/" + possHealsLeft;
};

function i360NoScopeForJesus(level) {

	for (i=0; playerLevel < level; i++) {

		XP = neededXP;
		levelUp();
	};
};

/* ------------------------------------------------------=====Attacks=====------------------------------------------------------ */ 
     
function lightningDash() {
		
		hit = Math.random();
		if (hit < .94 && lightningDashUsesLeft > 0) {
		
		lightningDashUsesLeft -= 1;
	    lightningDashDamage = Math.floor(Math.random() * ((Attack + 15) - Attack) + Attack);

		enemyHealth -= lightningDashDamage;
		playerHealth -= Math.floor(lightningDashDamage / 6);
		document.getElementById("log").value += "\n [Log]: You dealt " + lightningDashDamage + " to the enemy.";
		
		} else {

			playerHealth -= lightningDashDamage;
			document.getElementById("log").value += "\n [Log]: You missed your attack! You dealt some damage to yourself!";
		};
	moveCounter();
	enemyHealthCounter();
	enemyAttack();
	playerHealthCounter();
	scroller();
};

function fireFists() {
		
		enemyAttack();
		hit = Math.random();
		if (hit < .94 && fireFistsUsesLeft > 0) {

		fireFistsUsesLeft -= 1;
	    fireFistsDamage = (enemyAttackDamage * 2)
		enemyHealth -= fireFistsDamage;
		playerHealth -= Math.floor(fireFistsDamage / 2);
		document.getElementById("log").value += "\n [Log]: You dealt " + fireFistsDamage + " to the enemy.";
		
		} else {

			playerHealth -= Math.floor(fireFistsDamage / 2);
			document.getElementById("log").value += "\n [Log]: You missed your attack! You dealt some damage to yourself!";
		};
	moveCounter();
	enemyHealthCounter();
	playerHealthCounter();
	scroller();
};

function slideTackle() {

		hit = Math.random();
		if (hit < .94 && slideTackleUsesLeft > 0) {
		
		slideTackleUsesLeft -= 1;
	    slideTackleDamage = Attack;

		enemyHealth -= slideTackleDamage;
		document.getElementById("log").value += "\n [Log]: You dealt " + slideTackleDamage + " damage to the enemy.";
		
		} else {

			document.getElementById("log").value += "\n [Log]: You missed your attack!";
		};

	moveCounter();
	enemyHealthCounter();
	enemyAttack();
	playerHealthCounter();
	scroller();
};

function selfDefibrillation() {

		hit = Math.random();
		if (hit < .93) {

			selfDefibrillationHeal = Math.floor(Math.random() * (Defense - (Defense - 3)) + (Defense - 3));
			playerHealth += selfDefibrillationHeal;
			document.getElementById("log").value += "\n [Log]: You healed yourself of " + selfDefibrillationHeal + " damage!";
		} else {

			document.getElementById("log").value += "\n [Log]: Your heal failed! You dealt some damage to yourself!";
		};

	healsLeftCounter();
	enemyHealthCounter();
	playerHealthCounter();
	scroller();
};

function enemyAttack() {

	hit = Math.random();

	if (enemyHealth <= 0){

		document.getElementById("log").value += "\n [Log]: The enemy is dead, and can no longer attack!"
	} else {

	if (hit < .90) {

		enemyAttackDamage = Math.floor(Math.random() * ((Attack - 1) - (Attack - 4)) + (Attack - 4));
		playerHealth -= enemyAttackDamage;
		document.getElementById("log").value += "\n [Log]: The enemy attacked you causing " + enemyAttackDamage + " damage to you!";
	} else {

		document.getElementById("log").value += "\n [Log]: The enemy missed their attack!";
	};
};
	playerHealthCounter();
	enemyHealthCounter();
	scroller();
};