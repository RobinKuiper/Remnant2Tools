import React from "react";
import { getAllItems } from "../dataHelpers";
import { slugify } from "../helpers";

const newWeaponData = [
  {
    name: "Bolt Driver",
    type: "Hand Guns",
    description:
      "An ingenius Gul rifle designed to harness energy from Pan crystals. Charge to fire a 3- shot burst. \n  ",
    damage: "26",
    rps: "7.4",
    magazine: "24",
    idealRange: "17m",
    falloffRange: "52m",
    maxAmmo: "96",
    criticalHitChance: "10%",
    weakSpotDamageBonus: "+105%",
    staggerModifier: "-10%",
  },
  {
    name: "Double Barrel",
    type: "Hand Guns",
    description: "",
    damage: "110",
    rps: "2.3",
    magazine: "2",
    idealRange: "7m",
    falloffRange: "20m",
    maxAmmo: "24",
    criticalHitChance: "5%",
    weakSpotDamageBonus: "+100%",
    staggerModifier: "10%",
  },
  {
    name: "MP60-R",
    type: "Hand Guns",
    description: "A small-caliber submachine gun best suited for close range skirmishes. \n  ",
    damage: "9",
    rps: "14.2",
    magazine: "42",
    idealRange: "17m",
    falloffRange: "50m",
    maxAmmo: "252",
    criticalHitChance: "10%",
    weakSpotDamageBonus: "+100%",
    staggerModifier: "0%",
  },
  {
    name: "Repeater Pistol",
    type: "Hand Guns",
    description: "An accurate semi-automatic pistol that can rapidly fire small-caliber bullets. \n  ",
    damage: "15",
    rps: "7.5",
    magazine: "15",
    idealRange: "18m",
    falloffRange: "55m",
    maxAmmo: "150",
    criticalHitChance: "5%",
    weakSpotDamageBonus: "+105%",
    staggerModifier: "-10%",
  },
  {
    name: "Rupture Cannon",
    type: "Hand Guns",
    description: "A mid-range Pistol Shotgun with a brisk fire rate and medium recoil Slower reload. \n  ",
    damage: "42",
    rps: "3.1",
    magazine: "12",
    idealRange: "13m",
    falloffRange: "35m",
    maxAmmo: "60",
    criticalHitChance: "5%",
    weakSpotDamageBonus: "+100%",
    staggerModifier: "10%",
  },
  {
    name: "Service Pistol",
    type: "Hand Guns",
    description: "Astandard issue military spec sidearm known for its reliability and accuracy. \n  ",
    damage: "24",
    rps: "6.5",
    magazine: "9",
    idealRange: "20m",
    falloffRange: "50m",
    maxAmmo: "90",
    criticalHitChance: "5%",
    weakSpotDamageBonus: "+105%",
    staggerModifier: "0%",
  },
  {
    name: "Silverback Model 500",
    type: "Hand Guns",
    description: "A powerful hand cannon witha low capacity cylinder. High damage and a heavy kick. \n  ",
    damage: "55",
    rps: "2.4",
    magazine: "5",
    idealRange: "20m",
    falloffRange: "60m",
    maxAmmo: "40",
    criticalHitChance: "5%",
    weakSpotDamageBonus: "+105%",
    staggerModifier: "20%",
  },
  {
    name: "Sureshot",
    type: "Hand Guns",
    description: "A high-caliber single-shot hunting pistol that inflicts heavy damage at mid to long range. \n  ",
    damage: "105",
    rps: "3",
    magazine: "1",
    idealRange: "22m",
    falloffRange: "75m",
    maxAmmo: "21",
    criticalHitChance: "10%",
    weakSpotDamageBonus: "+110%",
    staggerModifier: "10%",
  },
  {
    name: "Tech 22",
    type: "Hand Guns",
    description: "A suppressed small-caliber automatic pistol with medium magazine capacity and a high fire rate. \n  ",
    damage: "8",
    rps: "16",
    magazine: "30",
    idealRange: "15m",
    falloffRange: "45m",
    maxAmmo: "270",
    criticalHitChance: "10%",
    weakSpotDamageBonus: "+100%",
    staggerModifier: "-10%",
  },
  {
    name: "Western Classic",
    type: "Hand Guns",
    description: "A classic six-shooter. Tough. Dependable. \n  ",
    damage: "32",
    rps: "5",
    magazine: "6",
    idealRange: "18m",
    falloffRange: "48m",
    maxAmmo: "66",
    criticalHitChance: "5%",
    weakSpotDamageBonus: "+105%",
    staggerModifier: "5%",
  },
  {
    name: "Rusty Repeater",
    type: "Hand Guns",
    description: "An old antique pistol. \n  ",
    damage: "15",
    rps: "7.2",
    magazine: "15",
    idealRange: "17m",
    falloffRange: "55m",
    maxAmmo: "180",
    criticalHitChance: "N/A",
    weakSpotDamageBonus: "+100%",
    staggerModifier: "-10%",
  },
  {
    name: "Cube Gun",
    type: "Hand Guns",
    description:
      "Projectiles return on hit or after reaching max range. Reloading retrieves shot projectiles. Max 5 fired projectiles. Infinite Ammo. Can overheat. \n  ",
    damage: "15",
    rps: "7.5",
    magazine: "5",
    idealRange: "18m",
    falloffRange: "50m",
    maxAmmo: "105",
    criticalHitChance: "5%",
    weakSpotDamageBonus: "+85%",
    staggerModifier: "0%",
    mod: "Cube Shield",
    modDescription:
      "Cube Shield Generates a Cube Shield which absorbs up to 500 damage from incoming enemy projectiles. Lasts 15s. Reactivating fires the Cube Shield which damages enemies as is travels. Damage is increased if the Cube Shield has absorbed enemy projectile damage before firing.  Mod Power Requirement: 1,000",
    hasMod: true,
  },
  {
    name: "Enigma",
    type: "Hand Guns",
    description:
      "Fires an electrical stream thatjumps to nearby targets within 7.5m, dealing 25% reduced damage perjump. Applies OVERLOADED for 5.2s. \n  ",
    damage: "22",
    rps: "4",
    magazine: "30",
    idealRange: "12m",
    falloffRange: "12m",
    maxAmmo: "120",
    criticalHitChance: "-10%",
    weakSpotDamageBonus: "N/A",
    staggerModifier: "-15%",
    mod: "Chaos Driver",
    modDescription:
      "Drives electrified rods into targets which tether to other rods within 10m. Tethers last 10s and deal 20 SHOCK damage per second. Targets embedded with a rod take 50 SHOCK damage per second. They take 25% additional damage per extra rod in the target. Damage is increased by 1.5x if linked to another rod. Rods in the same target will not link. Mod Power Requirement: 450",
    hasMod: true,
  },
  {
    name: "Hellfire",
    type: "Hand Guns",
    description: "Spews flames that apply BURNING which deals 300 FIRE damage over 10 seconds. \n  ",
    damage: "13",
    rps: "6",
    magazine: "60",
    idealRange: "8m",
    falloffRange: "8m",
    maxAmmo: "180",
    criticalHitChance: "N/A",
    weakSpotDamageBonus: "N/A",
    staggerModifier: "-15%",
    mod: "Explosive Shot",
    modDescription: "Fires an explosive round that deals up to 155 damage within 9m. Mod Power Requirement: 650",
    hasMod: true,
  },
  {
    name: "Meridian",
    type: "Hand Guns",
    description:
      " Fires volatile grenades that explode on direct contact with enemies and deal AOE damage within 4m. Dormant grenades eventually explode and can also be shot to detonate early.",
    damage: "82",
    rps: "1.9",
    magazine: "5",
    idealRange: "15m",
    falloffRange: "30m",
    maxAmmo: "40",
    criticalHitChance: "N/A",
    weakSpotDamageBonus: "N/A",
    staggerModifier: "0%",
    mod: "Screamer",
    modDescription: "Fires a high-powered rocket that deals up to 200 damage within 2.5m. Mod Power Requirement: 650",
    hasMod: true,
  },
  {
    name: "Nebula",
    type: "Hand Guns",
    description:
      "Fires a stream of superhot ACID gas which applies the CORRODED effect, dealing 300 CORROSIVE Damage over 15s. Killing targets CORRODED by Nebula spawns a gas cloud which applies its on-hit effect. Gas clouds lasts 2s and can be refreshed. \n  ",
    damage: "12",
    rps: "8",
    magazine: "55",
    idealRange: "8m",
    falloffRange: "8m",
    maxAmmo: "220",
    criticalHitChance: "N/A",
    weakSpotDamageBonus: "N/A",
    staggerModifier: "-15%",
    mod: "Nano Swarm",
    modDescription:
      "Unleash a swarm of Nanomachines that seek after enemies within 20 meters and repeatedly attack dealing 6 ACID damage per hit. Lasts 15 seconds. Mod Power Requirement: 750",
    hasMod: true,
  },
  {
    name: "Rune Pistol",
    type: "Hand Guns",
    description: "An accurate semi-automatic pistol that can rapidly fire small-caliber bullets. \n  ",
    damage: "15",
    rps: "6.6",
    magazine: "42",
    idealRange: "18m",
    falloffRange: "53m",
    maxAmmo: "168",
    criticalHitChance: "10%",
    weakSpotDamageBonus: "+100%",
    staggerModifier: "0%",
    mod: "Soul Brand",
    modDescription:
      "Applies Soul Brand to all enemies within 25m which lasts 25s. Enemies killed while bearing the Soul Brand leave behind an Echo which lasts 10s before returning to the Nightmare Realm.Echoes are drawn to any survivor who walks within 3m, granting 20% of Max Health on contact. Mod Power Requirement: 850",
    hasMod: true,
  },
  {
    name: "Sorrow",
    type: "Hand Guns",
    description:
      "The last vestiges of a fallen sister, this mystical crossbow pistol has the ability to recall its bolts to heal the wielder. \n  ",
    damage: "45",
    rps: "2.6",
    magazine: "5",
    idealRange: "16m",
    falloffRange: "52m",
    maxAmmo: "45",
    criticalHitChance: "10%",
    weakSpotDamageBonus: "+115%",
    staggerModifier: "5%",
    mod: "Eulogy",
    modDescription:
      "Recalls bolts which deal 30 damage when pulled fro, when striking targets on their return. Recalled bolts grant 2% of Max HP. Recalled bolts can also overfill Sorrow by up to +5. Any bolts will be returned to reserves. Mod Power Requirement: 600",
    hasMod: true,
  },
  {
    name: "Star Shot",
    type: "Hand Guns",
    description: "Fires a fast moving projectile which explodes on contact. Explosion has no damage falloff. \n  ",
    damage: "22",
    rps: "2.5",
    magazine: "10",
    idealRange: "21m",
    falloffRange: "54m",
    maxAmmo: "60",
    criticalHitChance: "5%",
    weakSpotDamageBonus: "+110%",
    staggerModifier: "10%",
    mod: "Big Bang",
    modDescription:
      "Funnels all current Mod Charges into the next shot. Projectile deals 65 direct damage and 65 Explosive damage in a 5m per Charge consumed. Explosion applies 75 BURNING damage over 10s per Charge consumed. Additional Charges consumed increase all damage by 5%. Max 5 Charges. Mod Power Requirement: 630",
    hasMod: true,
  },
  {
    name: "AS-10 Bulldog",
    type: "Long Guns",
    description: "A brutal drum-fed fully-automatic 10 gauge shotgun designed for close-quarters combat. \n  ",
    damage: "60",
    rps: "2.5",
    magazine: "12",
    idealRange: "10m",
    falloffRange: "32m",
    maxAmmo: "60",
    criticalHitChance: "5%",
    weakSpotDamageBonus: "100%",
    staggerModifier: "10%",
  },
  {
    name: "Blackmaw AR-47",
    type: "Long Guns",
    description: "A fully automatic rifle with a medium capacity. Highly effective with controlled bursts. \n  ",
    damage: "17",
    rps: "7.3",
    magazine: "38",
    idealRange: "20m",
    falloffRange: "60m",
    maxAmmo: "190",
    criticalHitChance: "10%",
    weakSpotDamageBonus: "100%",
    staggerModifier: "0%",
  },
  {
    name: "Chicago Typewriter",
    type: "Long Guns",
    description:
      "A classic Tommy Gun with large ammo capacity and a slow reload. Poor initial accuracy which improves while holding down the trigger. \n  ",
    damage: "10",
    rps: "11",
    magazine: "80",
    idealRange: "17m.",
    falloffRange: "55m",
    maxAmmo: "320",
    criticalHitChance: "10%",
    weakSpotDamageBonus: "105%",
    staggerModifier: "0%",
  },
  {
    name: "Coach Gun",
    type: "Long Guns",
    description:
      "A double-barrel over/under shotgun modified to fire powerful slugs. High damage with a decent fire rate, but very low magazine capacity. \n  ",
    damage: "115",
    rps: "2.3",
    magazine: "2",
    idealRange: "15m",
    falloffRange: "33m",
    maxAmmo: "28",
    criticalHitChance: "5%",
    weakSpotDamageBonus: "100%",
    staggerModifier: "10%",
  },
  {
    name: "Crossbow",
    type: "Long Guns",
    description: "An accurate and deadly single-shot crossbow with a low sound profile. \n  ",
    damage: "115",
    rps: "3.4",
    magazine: "1",
    idealRange: "23m",
    falloffRange: "70m",
    maxAmmo: "27",
    criticalHitChance: "10%",
    weakSpotDamageBonus: "115%",
    staggerModifier: "10%",
  },
  {
    name: "Ford's Scattergun",
    type: "Long Guns",
    description: "An incredibly powerful 12 gauge shotgun with a wide spread. High damage, slow reload. \n  ",
    damage: "130",
    rps: "1.1",
    magazine: "7",
    idealRange: "10m",
    falloffRange: "35m",
    maxAmmo: "28",
    criticalHitChance: "5%",
    weakSpotDamageBonus: "100%",
    staggerModifier: "10%",
  },
  {
    name: "Huntmaster M1",
    type: "Long Guns",
    description:
      "A powerful single-shot sniper rifle with excellent range and pinpoint accuracy. Comes with a 3x scope. Tap SCOPE to toggle. \n  ",
    damage: "70",
    rps: "1.5",
    magazine: "7",
    idealRange: "27m",
    falloffRange: "75m",
    maxAmmo: "42",
    criticalHitChance: "5%",
    weakSpotDamageBonus: "110%",
    staggerModifier: "5%",
  },
  {
    name: "Pulse Rifle",
    type: "Long Guns",
    description: "An extremely accurate, high-tech pulse rifle which shoots quick three-round bursts. \n  ",
    damage: "16",
    rps: "7.8",
    magazine: "30",
    idealRange: "22m",
    falloffRange: "65m",
    maxAmmo: "210",
    criticalHitChance: "10%",
    weakSpotDamageBonus: "105%",
    staggerModifier: "5%",
  },
  {
    name: "Royal Hunting Bow",
    type: "Long Guns",
    description:
      "The Postulant grants these to those who can defeat him. None know why. Some suspect that the game is mere preamble—that perhaps the true game is what its players do next. \n  ",
    damage: "80",
    rps: "4.3",
    magazine: "1",
    idealRange: "25m",
    falloffRange: "65m",
    maxAmmo: "40",
    criticalHitChance: "10%",
    weakSpotDamageBonus: "115%",
    staggerModifier: "5%",
  },
  {
    name: "Rusty Lever Action",
    type: "Long Guns",
    description: " A well-worn lever-action rifle. \n  ",
    damage: "55",
    rps: "1.8",
    magazine: "10",
    idealRange: "30m",
    falloffRange: "80m",
    maxAmmo: "60",
    criticalHitChance: "-",
    weakSpotDamageBonus: "+100%",
    staggerModifier: "0%",
  },
  {
    name: "Widowmaker",
    type: "Long Guns",
    description:
      "A powerful single-shot sniper rifle with excellent range and pinpoint accuracy. Comes with a 3x scope. Tap SCOPE to toggle. \n  ",
    damage: "125",
    rps: "2.4",
    magazine: "1",
    idealRange: "35m",
    falloffRange: "85m",
    maxAmmo: "27",
    criticalHitChance: "10%",
    weakSpotDamageBonus: "120%",
    staggerModifier: "20%",
  },
  {
    name: "Wrangler 1860",
    type: "Long Guns",
    description: "A well-rounded lever-action rifle effective at most ranges, hampered only by a slow reload. \n  ",
    damage: "55",
    rps: "2.1",
    magazine: "10",
    idealRange: "25m",
    falloffRange: "70m",
    maxAmmo: "50",
    criticalHitChance: "10%",
    weakSpotDamageBonus: "110%",
    staggerModifier: "0%",
  },
  {
    name: "Aphelion",
    type: "Long Guns",
    description: "Fires a hypercharged wide-arcing line that passes through targets. \n  ",
    damage: "62",
    rps: "2",
    magazine: "7",
    idealRange: "20m",
    falloffRange: "65m",
    maxAmmo: "49",
    criticalHitChance: "15%",
    weakSpotDamageBonus: "100%",
    staggerModifier: "-25%",
    mod: "Supernova",
    modDescription:
      "Fires the compressed remains of a dying star. On contact or hit wit the primary fire, causes Supernova to explode for 150 FIRE Damage, and 350 BURNING Damage over 10s to all targets within 4m.Striking the Supernova with Aphelion's primary fire increases its explosion radius by 25% and damage by 50%, and spawns a massive shockwave that deals 300 FIRE damage and also applies the initial BURNING amount.Mod Power Requirement: 1,250.",
    hasMod: true,
  },
  {
    name: "XMG57 Bonesaw",
    type: "Long Guns",
    description:
      "An experimental infantry support weapon used for prolonged suppressive fire. High capacity, long reload, and prone to overheating. Becomes more accurate while holding down the trigger. \n  ",
    damage: "12",
    rps: "9.5",
    magazine: "150",
    idealRange: "19m",
    falloffRange: "45m",
    maxAmmo: "300",
    criticalHitChance: "10%",
    weakSpotDamageBonus: "100%",
    staggerModifier: "0%",
  },
  {
    name: "Alpha-Omega",
    type: "Long Guns",
    description:
      "After charging, fires an accurate high-damage rail which penetrates any target. Each successful hit reduces the charge time by 0.1s and increases damage by 10% for 1.5s. Stacks 5x. \n  ",
    damage: "15",
    rps: "7.2",
    magazine: "55",
    idealRange: "24m",
    falloffRange: "70m",
    maxAmmo: "275",
    criticalHitChance: "10%",
    weakSpotDamageBonus: "100%",
    staggerModifier: "0%",
    mod: "Beta Ray",
    modDescription:
      "Brands a target for 30s. Branded enemies that die leave a Brand at their location.Reloading or Swapping detonates Brands dealing 225 damage.Additional Brands (3Max) on the same target deal 50% damage.Slain enemies return 5-15% of Ammo and Mod power to the weapon.Mod Power Requirement: 450",
    hasMod: true,
  },
  {
    name: "Crescent Moon",
    type: "Long Guns",
    description: "",
    damage: "87",
    rps: "4.1",
    magazine: "1",
    idealRange: "25m",
    falloffRange: "65m",
    maxAmmo: "38",
    criticalHitChance: "5%",
    weakSpotDamageBonus: "70%",
    staggerModifier: "-15%",
    mod: "Moonlight Barrage",
    modDescription:
      "Empowers the Bow for 15s. Arrows apply Moonlight to enemies for 3s. Enemies struck by Crescent Moon while Moonlit release a Moon Essence which returns 1 arrow, heals 5% of Max Health, and grants 15% Fire and Reload Speed for 5s.Basic Shots automatically become Charged Shots. Manually Charged Shots fire two arrows.Power Requirement: 1,250",
    hasMod: true,
  },
  {
    name: "Deceit",
    type: "Long Guns",
    description:
      "A pinpoint accurate split-barreled rifle that fires two penetrating rails. High base damage, but cannot score Weakspot hits. Charge to fire \n  ",
    damage: "120",
    rps: "2",
    magazine: "6",
    idealRange: "28m",
    falloffRange: "75m",
    maxAmmo: "30",
    criticalHitChance: "15%",
    weakSpotDamageBonus: "+90%",
    staggerModifier: "5%",
    mod: "Ouroboros",
    modDescription:
      "Conjures 3 sword fragments that encircle the wielder for 30s.Performing a Melee Attack lets loose a Fragment which traints the blood of targets, causing all attacks from Deceit to register as Weakspot hits for short period of time.Charge Melee Attacks fires all remaining Fragments at once.Mod Power Requirement: 1.440      ",
    hasMod: true,
  },
  {
    name: "Merciless",
    type: "Long Guns",
    description:
      " Fires tooth-like flechettes. When weapon reticle is fully compressed, flechettes apply 250 BLEEDING Damage over 10s.",
    damage: "13",
    rps: "8.6",
    magazine: "50",
    idealRange: "20m",
    falloffRange: "45m",
    maxAmmo: "250",
    criticalHitChance: "10%",
    weakSpotDamageBonus: "100%",
    staggerModifier: "0%",
    mod: "Bloodline",
    modDescription:
      "Fires a devastating blast which penetrates through all enemies in its path. Deals 150 damage with a 25% Critical damage bonus, and 3x additional stagger. Bloodline damage increases by 50% for each enemy penetratedMod Power Requirement: 350",
    hasMod: true,
  },
  {
    name: "Nightfall",
    type: "Long Guns",
    description:
      "A device forged of pure evil. Fires hardened bone shards at bonus stagger. Semi-automatic with a medium kick. \n  ",
    damage: "31",
    rps: "5",
    magazine: "10",
    idealRange: "18m",
    falloffRange: "50m",
    maxAmmo: "90",
    criticalHitChance: "5%",
    weakSpotDamageBonus: "105%",
    staggerModifier: "15%",
    mod: "Dreadwalker",
    modDescription:
      "Enter the Nightmare Realm. Nightfall gains infinite Ammo, a 35% Fire Rate increase, 10% Lifesteal, and becomes fully automatic. The wielder becomes significantly harder to hit while moving.Disables other weapons and Skills for the duration, or until Dreadwalker is deactivated. Lasts 10s.Mod Power Requirement: 1,250",
    hasMod: true,
  },
  {
    name: "Plasma Cutter",
    type: "Long Guns",
    description: "An energy-based cutting tool that increases damage when focused on a target. Can overheat. \n  ",
    damage: "7",
    rps: "13",
    magazine: "100",
    idealRange: "17m",
    falloffRange: "30m",
    maxAmmo: "400",
    criticalHitChance: "5%",
    weakSpotDamageBonus: "75%",
    staggerModifier: "-20%",
    mod: "Heat Sink",
    modDescription:
      "Forces open Plasma Cutter's heat vents dispersing all heat. While active, Plasma Cutter generates 50% less heat, and ramping damage cap is increased to 3x Damage. Overheats automatically when deactivated. Lasts 20s.Mod Power Requirement: 850",
    hasMod: true,
  },
  {
    name: "Sagittarius",
    type: "Long Guns",
    description:
      "A high-powered Bow which deals bonus damage to Weakspots. Can be charged for increased effect. Perfect release after Charge for maximum damage \n  ",
    damage: "98",
    rps: "4.5",
    magazine: "1",
    idealRange: "25m",
    falloffRange: "65m",
    maxAmmo: "32",
    criticalHitChance: "10%",
    weakSpotDamageBonus: "115%",
    staggerModifier: "5%",
    mod: "Starfall",
    modDescription:
      "Fires a powerful arrow which deals 30 damage and opens a 7m portal that rains down star fragments. Each fragment deals 50 damage within 4m. Lasts 6s. Mod Power Requirement: 750",
    hasMod: true,
  },
  {
    name: "Twisted Arbalest",
    type: "Long Guns",
    description:
      " A strange device which fires a bouncing Energy Disc that can hit up to 5 enemies in close proximity. Damage is reduced with each bounce.",
    damage: "80",
    rps: "2",
    magazine: "1",
    idealRange: "20m",
    falloffRange: "70m",
    maxAmmo: "22",
    criticalHitChance: "5%",
    weakSpotDamageBonus: "100%",
    staggerModifier: "5%",
    mod: "Guardian's Call",
    modDescription:
      "When Mod Power is full, Primary Fire becomes Empowered and highlights enemies it strikes.Activation the Mod calls down a Guardian Sword on enemies struck by an Empowered Energy Disc. Swords deal 100 damage and 3x stagger within 5m. Mod Power Requirement: 750",
    hasMod: true,
  },
  {
    name: "Atom Smasher",
    type: "Melee Weapons",
    description: "A powerful crushing device that harnesses rocket technology to increase smashing force. \n  ",
    damage: "72",
    criticalHitChance: "5%",
    weakSpotDamage: "+95%",
    staggerModifier: "11%",
    mod: "Accelerator",
    modDescription: "Charge Melee Attacks increase the speed of all Melee Attacks by 10% for 5s.",
    hasMod: true,
  },
  {
    name: "Blade of Adventure",
    type: "Melee Weapons",
    description: " A long, sharp blade hammered out of vehicle leaf springs. Well-rounded for most situations.",
    damage: "0",
    criticalHitChance: "N/A",
    staggerModifier: "N/A",
  },
  {
    name: "Blade of Gul",
    type: "Melee Weapons",
    description:
      "A short, but thick sword, used by Gul Warriors. It's compact design makes for swift yet hard-hitting blows. An excellent close-range option. \n  ",
    damage: "57",
    criticalHitChance: "4%",
    weakSpotDamage: "+100%%",
    staggerModifier: "6%",
  },
  {
    name: "Bone Chopper",
    type: "Melee Weapons",
    description: "A razor-sharp hand axe. Excellent for separating flesh from bone. Charge for double attacks. \n  ",
    damage: "58",
    criticalHitChance: "7%",
    weakSpotDamage: "+105%%",
    staggerModifier: "-3%",
  },
  {
    name: "Edge of the Forest",
    type: "Melee Weapons",
    description:
      "An elegant, yet light blade, designed to bring beauty to bloodshed. Unstoppable in the hands of a master swordsman. \n  ",
    damage: "59",
    criticalHitChance: "9%",
    weakSpotDamage: "+105%",
    staggerModifier: "-15%",
  },
  {
    name: "Iron Greatsword",
    type: "Melee Weapons",
    description:
      "A giant broadsword made from flattened railroad tracks. Dozens of ridges cut in the side for causing irreparable damage. \n  ",
    damage: "105",
    criticalHitChance: "5%",
    weakSpotDamage: "+95%",
    staggerModifier: "13%",
  },
  {
    name: "Knuckle Dusters",
    type: "Melee Weapons",
    description: " Steel knuckles with rusty sawblade tips, designed to boost Unarmed damage.",
    damage: "43",
    criticalHitChance: "5%",
    weakSpootDamage: "+110%",
    staggerModifier: "5%",
  },
  {
    name: "Labyrinth Staff",
    type: "Melee Weapons",
    description:
      "Basic Strikes generate 10% additional Mod Power. Charge Attacks perform an AOE which strikes all enemies within 2m, dealing 75 Damage. AOE Damage generates 50% additional Mod Power. \n  ",
    damage: "64",
    criticalHitChance: "8%",
    weakSpootDamage: "+95%",
    staggerModifier: "5%",
  },
  {
    name: "Ornate Blade",
    type: "Melee Weapons",
    description:
      "An intricately-forged elongated sword. Designed to keep stronger enemies at bay, while remaining light enough for agile maneuvers. \n  ",
    damage: "52",
    criticalHitChance: "11%",
    weakSpotDamage: "+105%",
    staggerModifier: "-5%",
  },
  {
    name: "Ornate Flail",
    type: "Melee Weapons",
    description:
      "An intricately-forged mace with uniquely designed airways. Allows smaller wielders to get the mace up to speed much quicker. \n  ",
    damage: "63",
    criticalHitChance: "11%",
    weakSpootDamage: "+100%",
    staggerModifier: "-3%",
  },
  {
    name: "Rebellion Spear",
    type: "Melee Weapons",
    description:
      "A spear perfect for staying at a distance. Has excellent range, great recovery, and focused direct damage for one on one combat. \n  ",
    damage: "60",
    criticalHitChance: "13%",
    weakSpotDamage: "+110%",
    staggerModifier: "2%",
  },
  {
    name: "Royal Broadsword",
    type: "Melee Weapons",
    description:
      "Standard issue Greatsword for the Empress's Royal Guards. Razor-sharp edges, extremely heavy, yet perfectly balanced. \n  ",
    damage: "102",
    criticalHitChance: "7%",
    weakSpotDamage: "+95%",
    staggerModifier: "11%",
  },
  {
    name: "Rusted Claws",
    type: "Melee Weapons",
    description:
      "A pair of old-canine training bracers converted into deadly claws. Used for slashing and ripping. \n  ",
    damage: "51",
    criticalHitChance: "14%",
    weakSpotDamage: "+110%%",
    staggerModifier: "-9%",
  },
  {
    name: "Scrap Hammer",
    type: "Melee Weapons",
    description:
      "A large, heavy warhammer cobbled together from engine components. It is a slow- but-devastating weapon meant to destroy anything it hits. \n  ",
    damage: "83",
    criticalHitChance: "8%",
    weakSpootDamage: "+95%",
    staggerModifier: "9%",
  },
  {
    name: "Scrap Hatchet",
    type: "Melee Weapons",
    description:
      "A common chopping tool that has been repurposed for combat. Rapidly cycles attacks from right to left. Charge attacks strike twice. \n  ",
    damage: "57",
    criticalHitChance: "6%",
    weakSpootDamage: "+105%",
    staggerModifier: "1%",
  },
  {
    name: "Scrap Staff",
    type: "Melee Weapons",
    description: "A staff made from old plumbing parts used for controlling wide swaths in front of the wielder. \n  ",
    damage: "65",
    criticalHitChance: "6%",
    weakSpootDamage: "+95%",
    staggerModifier: "8%",
  },
  {
    name: "Steel Flail",
    type: "Melee Weapons",
    description:
      "An unorthodox weapon meant to convert momentum into destruction. Some attacks can continuously chain overhead swings. \n  ",
    damage: "69",
    criticalHitChance: "4%",
    weakSpootDamage: "+100%",
    staggerModifier: "6%",
  },
  {
    name: "Steel Katana",
    type: "Melee Weapons",
    description: "An old piece of steel with serrations cut into one side. Pipe handle provides limited grip. \n  ",
    damage: "56",
    "criticalHitChance ": "10%",
    weakSpotDamage: "+105%",
    staggerModifier: "-10%",
  },
  {
    name: "Steel Spear",
    type: "Melee Weapons",
    description: "A spear perfect for staying at range with quick, focused attacks. High, single-target damage. \n  ",
    damage: "61",
    criticalHitChance: "9%",
    weakSpootDamage: "+110%",
    staggerModifier: "-4%",
  },
  {
    name: "Steel Sword",
    type: "Melee Weapons",
    description: "A long, sharp blade hammered out of vehicle leaf springs. Well-rounded for most situations. \n  ",
    damage: "56",
    criticalHitChance: "7%",
    weakSpootDamage: "+100%",
    staggerModifier: "2%",
  },
  {
    name: "Gas Giant",
    type: "Melee Weapons",
    description:
      "Builds up charge with damage dealt. When full, basic attacks apply CORRODED, for 5s. Neutral Evade attacks explode in a 3m AOE and leave a TOXIC cloud. \n  ",
    damage: "78",
    criticalHitChance: "5%",
    staggerModifier: "0%",
  },
  {
    name: "Vice Grips",
    type: "Melee Weapons",
    description: "A N'Erudian tool converted into a ruthless ripping device. High raw damage. \n  ",
    damage: "55",
    criticalHitChance: "6%",
    weakSpootDamage: "+110%",
    staggerModifier: "-18%",
  },
  {
    name: "Huntress Spear",
    type: "Melee Weapons",
    description:
      "The spear is oddly...quiet. Even when you slide your hand across its haft or drop it upon the ground, it makes an unthinkably small amount of noise. \n  ",
    damage: "63",
    criticalHitChance: "6%",
    weakSpotDamage: "+100%",
    staggerModifier: "-5%",
    mod: "Athibar",
    modDescription: "Charge attacks use 25 stamina to throw the spear which returns to the wielder's hand.",
    hasMod: true,
  },
  {
    name: "Krell Axe",
    type: "Melee Weapons",
    description:
      "Infused with Krell Shock magic, can be thrown if the wielder has stamina. Axe will magically reappear in-hand. Charge to throw. \n  ",
    damage: "54",
    criticalHitChance: "3%",
    weakSpotDamage: "+85%",
    staggerModifier: "-10%",
    mod: "Krell Edge",
    modDescription:
      "Charge to throw the Krell Axe which applies OVERLOADED on hit, dealing 50 SHOCK Damage every 5s for 10s. Shortly after throwing, another will appear in the wielders hand.Costs 25 Stamina.",
    hasMod: true,
  },
  {
    name: "Assassin's Dagger",
    type: "Melee Weapons",
    description:
      "Lightweight. Silent. Deadly. It's rumored that the blade is meant to bestow a slow, agonizing death. \n  ",
    damage: "41",
    criticalHitChance: "-3%",
    weakSpotDamage: "+110%%",
    staggerModifier: "-15%",
    mod: "Bloodthirst",
    modDescription:
      "Damage increases by +25% against BLEEDING enemies, and +25% when attacking from behind. Charge Attacks deal 200 BLEEDING damage over 10s.",
    hasMod: true,
  },
  {
    name: "Atom Splitter",
    type: "Melee Weapons",
    description: " A giant tool for splitting heavy rocks.",
    damage: "100",
    criticalHitChance: "5%",
    weakSpotDamage: "+90%%",
    staggerModifier: "6%",
    mod: "Fission Strike",
    modDescription:
      "On Neutral Evade Attacks Atom Splitter achieves Nuclear Fission, releasing a wave of charged particles which deals 150 Damage to targets within 20m.Charged Neutral Evade Attacks increase Range by 3x and Damage by 25%.",
    hasMod: true,
  },
  {
    name: "Dreamcatcher",
    type: "Melee Weapons",
    description:
      " There is an ethereal lightness to this weapon, as though it were made of paper or breath.Though it strikes its foes forcibly enough.",
    damage: "58",
    criticalHitChance: "5%",
    weakSpotDamage: "95%",
    staggerModifier: "3%",
    mod: "Dreamwave",
    modDescription:
      "After dealing 250 damage, Charge Attack will release a Dreamwave, flowing outwards 20m and returning to caster.Dreamwave applies SLOW to all enemies for 10s and grants a Stack of REVERIE for each enemy affected. Each Stack grants +2% to All Damage and +2% Movement Speed, which lasts 15s.",
    hasMod: true,
  },
  {
    name: "Feral Judgement",
    type: "Melee Weapons",
    description: "A pair of gauntlets with sharp crystal blades that strike with vicious speed and velocity. \n  ",
    damage: "53",
    criticalHitChance: "13%",
    weakSpotDamage: "+110%",
    staggerModifier: "-15%",
    mod: "Death Sentence",
    modDescription:
      "Dealing Melee Damage 6 times over 10s empowers Feral Judgement. When empowered, Neutral Backdash Charge attacks apply Death Sentence.After 15s of being sentenced, the enemy will suffer 10 Phantom Strikes, dealing 25 Damage each. Deals 25% additional damage to BLEEDING enemies.",
    hasMod: true,
  },
  {
    name: "Godsplitter",
    type: "Melee Weapons",
    description: "An expertly balanced blade that is the produc of advanced Fae metallurgy. \n  ",
    damage: "38",
    criticalHitChance: "2%",
    weakSpotDamage: "+50%%",
    staggerModifier: "-20%",
    mod: "Fracture",
    modDescription:
      "Charge Attacks taint the blood of targets, causing all attacks from Godsplitter to register as Weakspot hits for 2s seconds.",
    hasMod: true,
  },
  {
    name: "Hero's Sword",
    type: "Melee Weapons",
    description:
      "An ancient, quick, and versatile blade suited for many situations. Charge attacks cast a projectile for dealing melee damage at range. \n  ",
    criticalHitChance: "5%",
    weakSpootDamage: "+90%",
    staggerModifier: "-10%",
    mod: "Energy Wave",
    modDescription:
      "Charge attacks use 35 stamina to release an energy wave projectile allowing the wielder to strike enemies from much farther away.",
    hasMod: true,
  },
  {
    name: "Nightshade",
    type: "Melee Weapons",
    description:
      "Fast striking claws with a high Critical Hit Chance.Neutral Dodge grants the power  of Lifesteal. \n  ",
    damage: "47",
    criticalHitChance: "18%",
    weakSpootDamage: "+110%",
    staggerModifier: "-20%",
    mod: "Beyond The Veil",
    modDescription:
      "Neutral Evade turns to mist, granting Nightshade 5% base damage as Lifesteal for 5s. Perfect Dodge doubles duration.",
    hasMod: true,
  },
  {
    name: "Red Doe Staff",
    type: "Melee Weapons",
    description: "A magical stave rumored to contain a healing spirit within. Strikes with wide swings. \n  ",
    damage: "62",
    criticalHitChance: "3%",
    weakSpootDamage: "+95%",
    staggerModifier: "8%",
    mod: "Lifeline",
    modDescription:
      "After dealing 250 damage, the next charge attack causes the spirit of the RED DOE to stampede forward, dealing 160 damage to enemies and regenerating 10% Health to allies in its path.",
    hasMod: true,
  },
  {
    name: "Spectral Blade",
    type: "Melee Weapons",
    description: "A super-heated laser sword with an infinitely sharp edge. Perfect for cutting... anything. \n  ",
    damage: "53",
    criticalHitChance: "8%",
    weakSpootDamage: "+105%",
    staggerModifier: "-25%",
    mod: "Whirlwind",
    modDescription:
      "Neutral Backdash Charge creates a Whirlwind of slashes which strike all enemies within 8m for 75 damage.",
    hasMod: true,
  },
  {
    name: "Stonebreaker",
    type: "Melee Weapons",
    description:
      "A massive Greatsword which contains the harnessed magic of a corrupted Guardian. Can summon small shockwaves. \n  ",
    damage: "103",
    criticalHitChance: "4%",
    weakSpotDamage: "+95%",
    staggerModifier: "10%",
    mod: "Faultline",
    modDescription: "Charge to fire off ground-based shockwaves which deals 115 damage. Costs 35 Stamina.",
    hasMod: true,
  },
];
const newArmorData = [
  {
    name: "Academic's Hat",
    type: "headpiece",
    description:
      "A soft and durable felt hat fashioned to stylize, not necessarily protect, the most important part of your body.",
    armor: "11",
    weight: "7",
    resistances: {
      bleed: "1",
      fire: "0",
      shock: "0",
      blight: "2",
      corrosion: "3",
    },
  },
  {
    name: "Bruiser Helmet",
    type: "headpiece",
    description:
      "The visibility in this helmet leaves much to be desired, but that's not really the point. It goes a long way in keeping your head on your shoulders. \n  ",
    armor: "15",
    weight: "9",
    resistances: {
      bleed: "1",
      fire: "2",
      shock: "0",
      blight: "0",
      corrosion: "1",
    },
  },
  {
    name: "Trainer Cap",
    type: "headpiece",
    description:
      "For some reason, your head feels naked without this simple baseball cap with a fox logo. That aside, it keeps the sun out of your eyes, and that's all you ask of it.",
    armor: "7",
    weight: "4",
    resistances: {
      bleed: "0",
      fire: "0",
      shock: "0",
      blight: "0",
      corrosion: "1",
    },
  },
  {
    name: "Dendroid Mask",
    type: "headpiece",
    description:
      "It's like putting your head inside the monsters you've been killing all this time. It's comfortable enough though, so long as you don't think about where it's been.",
    armor: "7",
    weight: "3",
    resistances: {
      bleed: "2",
      fire: "0",
      shock: "0",
      blight: "0",
      corrosion: "2",
    },
  },
  {
    name: "Elder Headdress",
    type: "headpiece",
    description:
      "This headpiece hails from the wild and mysterious world of Yaesha. Its smooth,featureless. design is both eerie and elegant, painted a stark white and adornedwith luxuriant fur and imposing horns. \n  ",
    armor: "12",
    weight: "6",
    resistances: {
      bleed: "0",
      fire: "3",
      shock: "0",
      blight: "2",
      corrosion: "0",
    },
  },
  {
    name: "Fae Royal Headcover",
    type: "headpiece",
    description:
      "It feels like you're not wearing any helmet at all - you'd swear you could even feel the wind in your hair. Yet it turns an arrow as effectively as any steel.",
    armor: "15",
    weight: "8",
    resistances: {
      bleed: "2",
      fire: "2",
      shock: "0",
      blight: "2",
      corrosion: "0",
    },
  },
  {
    name: "Field Medic Hat",
    type: "headpiece",
    description:
      "While it may shield your eyes from the sun, it's not particularly protective against the dangers of the Root.",
    armor: "9",
    weight: "5",
    resistances: {
      bleed: "0",
      fire: "0",
      shock: "0",
      blight: "2",
      corrosion: "1",
    },
  },
  {
    name: "Field Medic Mask",
    type: "headpiece",
    description:
      "This face covering protects you from contagions without obstructing your sight. You feel like a creature from another world in this thing. Perhaps that's fitting.",
    armor: "9",
    weight: "5",
    resistances: {
      bleed: "0",
      fire: "0",
      shock: "0",
      blight: "2",
      corrosion: "1",
    },
  },
  {
    name: "High Noon Hat",
    type: "headpiece",
    description:
      "Something about this hat just feels right. Paired with a bandana, it keeps the sun and elements from hindering your all-important aim.",
    armor: "8",
    weight: "4",
    resistances: {
      bleed: "0",
      fire: "1",
      shock: "1",
      blight: "0",
      corrosion: "1",
    },
  },
  {
    name: "Knotted Helm",
    type: "headpiece",
    description:
      "A hauntingly familiar visage, convincing enough to still be alive. To truly know your enemy, you must get inside its head. Literally.",
    armor: "13",
    weight: "8",
    resistances: {
      bleed: "0",
      fire: "0",
      shock: "0",
      blight: "1",
      corrosion: "2",
    },
  },
  {
    name: "Void Skull",
    type: "headpiece",
    description:
      "The skull-like helm hails from the inhospitable world of Rhom, where survival demands more than just strength and cunning. Fashioned from a mysterious material, its surface glimmers with an otherworldly sheen that seems to shift and change with the light. Its sleek and angular lines, reminiscent of some alien technology, evoke a sense of unease in those who gaze upon it.",
    armor: "15",
    weight: "8",
    resistances: {
      bleed: "0",
      fire: "1",
      shock: "2",
      blight: "0",
      corrosion: "1",
    },
  },
  {
    name: "Leto Mark II Helmet",
    type: "headpiece",
    description:
      "While this ironclad helmet is somewhat difficult to breathe in, you feel secure knowing even the heaviest weapon would have little chance of cracking into your skull.",
    armor: "22",
    weight: "13",
    resistances: {
      bleed: "2",
      fire: "3",
      shock: "1",
      blight: "1",
      corrosion: "2",
    },
  },
  {
    name: "Lodestone Crown",
    type: "headpiece",
    description:
      "This crown was worn by King Kolket himself. It could be heresy for a paxultek to wear such an artifact, but there are few left among the Pan who would even recognize it as their own. \n  ",
    armor: "5",
    weight: "3",
    resistances: {
      bleed: "-2",
      fire: "0",
      shock: "-1",
      blight: "5",
      corrosion: "0",
    },
  },
  {
    name: "Navigator's Helm",
    type: "headpiece",
    description:
      "It's hard to imagine someone piloting an entire world, but that's who this helm was for. The sockets allowed them to speak with N'Erud directly. N'Erud had dozens of pilots, all working in concert-both with each other and with the world itself.",
    armor: "12",
    weight: "8",
    resistances: {
      bleed: "-1",
      fire: "-1",
      shock: "2",
      blight: "-1",
      corrosion: "3",
    },
  },
  {
    name: "Nightstalker Shroud",
    type: "headpiece",
    description:
      "A hunting mask with advanced respirator capabilities. It purifies yet does nothing to mask the stench of death that permeates the air.",
    armor: "11",
    weight: "6",
    resistances: {
      bleed: "0",
      fire: "1",
      shock: "1",
      blight: "3",
      corrosion: "0",
    },
  },
  {
    name: "Radiant Visage",
    type: "headpiece",
    description:
      'The cowl is a striking blue, which contrasts with the large, featureless golden mask that covers the face of the wearer. This armor was highly coveted and only granted to those few who were recognized as the "Radiant Ones."',
    armor: "14",
    weight: "8",
    resistances: {
      bleed: "1",
      fire: "1",
      shock: "3",
      blight: "1",
      corrosion: "0",
    },
  },
  {
    name: "Realmwalker Beret",
    type: "headpiece",
    description:
      "This hat once belonged to Founder Ford. He was only a captain then-a much younger Ford, from a long time and many lives ago.",
    armor: "4",
    weight: "2",
    resistances: {
      bleed: "0",
      fire: "0",
      shock: "1",
      blight: "1",
      corrosion: "0",
    },
  },
  {
    name: "Red Widow Headdress",
    type: "headpiece",
    description:
      "The horns of this helmet are ornamental, designed to be displayed in addition to the Pan wearer's own horns-which themselves protrude from additional openings in the armor-to create a truly frightening visage.",
    armor: "13",
    weight: "8",
    resistances: {
      bleed: "2",
      fire: "0",
      shock: "0",
      blight: "2",
      corrosion: "0",
    },
  },
  {
    name: "Space Worker Mask",
    type: "headpiece",
    description:
      "People (Mudtooth mostly) tell stories of how, before the Root, humans could fly into space. It's probably not true, but if it were, they'd need something like this to keep them alive out there.",
    armor: "6",
    weight: "3",
    resistances: {
      bleed: "1",
      fire: "0",
      shock: "2",
      blight: "0",
      corrosion: "2",
    },
  },
  {
    name: "Technician Helmet",
    type: "headpiece",
    description:
      "An overwhelming amount of information shines within the helmet's display, the vast majority of it incomprehensible. Whether that's because it's a foreign language or the helmet has been damaged by whatever destroyed this place is anybody's guess.",
    armor: "14",
    weight: "8",
    resistances: {
      bleed: "0",
      fire: "1",
      shock: "2",
      blight: "0",
      corrosion: "2",
    },
  },
  {
    name: "Labyrinth Headplate",
    type: "headpiece",
    description: "This helmet is reminiscent of a statue from a time long, long before.",
    armor: "12",
    weight: "7",
    resistances: {
      bleed: "0",
      fire: "2",
      shock: "3",
      blight: "0",
      corrosion: "0",
    },
  },
  {
    name: "Academic's Gloves",
    description:
      "The initials of the Dran who once owned these - and misplaged them often - are embroidered on the wool-lined inside. \n  ",
    armor: "7",
    weight: "4",
    resistances: {
      bleed: "0",
      fire: "0",
      shock: "0",
      blight: "1",
      corrosion: "2",
    },
  },
  {
    name: "Bruiser Gloves",
    description:
      "These gauntlets are as tough as steel, as hard as stone, and up for whatever dangers or challenges come their way. They suit you well. \n  ",
    armor: "11",
    weight: "7",
    resistances: {
      bleed: "1",
      fire: "2",
      shock: "0",
      blight: "0",
      corrosion: "1",
    },
  },
  {
    name: "Dendroid Grips",
    description:
      "Against all logic, these gloves feel natural. Like extensions of who you were meant to be. Seems like that should bother you more. \n  ",
    armor: "4",
    weight: "3",
    resistances: {
      bleed: "1",
      fire: "0",
      shock: "0",
      blight: "1",
      corrosion: "1",
    },
  },
  {
    name: "Elder Gloves",
    description:
      "Features striking loops of gold that add an ornate touch to the otherwise plain design. Curiously, these embellishments are only present on the left-hand glove, making it stand out from its counterpart on the right. \n  ",
    armor: "3",
    weight: "3",
    resistances: {
      bleed: "0",
      fire: "2",
      shock: "0",
      blight: "1",
      corrosion: "1",
    },
  },
  {
    name: "Fae Royal Vambraces",
    description: "Suitable for archery or swordplay - for killing of any sort really. \n  ",
    armor: "10",
    weight: "7",
    resistances: {
      bleed: "1",
      fire: "1",
      shock: "0",
      blight: "1",
      corrosion: "0",
    },
  },
  {
    name: "Field Medic Gloves",
    description:
      "At a glance it's clear that these fingerless gloves won't keep you warm or offer much protection. Even still, you wear them because they provide improved grip without impacting precision. \n  ",
    armor: "8",
    weight: "5",
    resistances: {
      bleed: "2",
      fire: "0",
      shock: "0",
      blight: "1",
      corrosion: "1",
    },
  },
  {
    name: "High Noon Armguards",
    description:
      "Metal arm guards paired with well-worn gloves that are more comfortable gripping a warm gun than reaching for a handshake. They're tasked with protecting your greatest asset - your trigger finger. \n  ",
    armor: "8",
    weight: "6",
    resistances: {
      bleed: "0",
      fire: "2",
      shock: "2",
      blight: "0",
      corrosion: "1",
    },
  },
  {
    name: "Knotted Gloves",
    description:
      "The deadwood claws fit you almost too snug, making it difficult to remember where bark ends and your own flesh begins. \n  ",
    armor: "10",
    weight: "6",
    resistances: {
      bleed: "1",
      fire: "0",
      shock: "0",
      blight: "1",
      corrosion: "2",
    },
  },
  {
    name: "Void Wraps",
    description:
      "Crafted from an enigmatic substance that resembles hardened bone in appearance. These gloves are a powerful tool in the hands of those who would wield the void, drawing energy from the emptiness between worlds to unleash devastating attacks. But with great power comes great cost, and those who dare to wear these gloves must be prepared to pay the price. \n  ",
    armor: "8",
    weight: "6",
    resistances: {
      bleed: "0",
      fire: "1",
      shock: "1",
      blight: "0",
      corrosion: "1",
    },
  },
  {
    name: "Leto Mark II Gloves",
    description:
      "These gauntlets are sturdy enough to hold up even agaist the Root: They're tough and intimidating while providing the bare-minimnum level of dexterity for,a steady grip on your weapon of choice. Just don't plan on completing any tasks that require subtlety when wearing these. \n  ",
    armor: "17",
    weight: "10",
    resistances: {
      bleed: "2",
      fire: "1",
      shock: "2",
      blight: "1",
      corrosion: "3",
    },
  },
  {
    name: "Nightstalker Gloves",
    description:
      "A single glove and arm wrap are all you need or‘want for ar protection. The only defense you can truly rely on is a loaded gun and a cle shot. \n  ",
    armor: "6",
    weight: "3",
    resistances: {
      bleed: "2",
      fire: "1",
      shock: "1",
      blight: "7",
      corrosion: "0",
    },
  },
  {
    name: "Radiant Bracers",
    description:
      "The fingerless leather gloves provide exceptional dexterity to the wearer, while the vambracers are adorned with a blue gem that gives the wearer acess to the volatile energy stored within. \n  ",
    armor: "11",
    weight: "6",
    resistances: {
      bleed: "1",
      fire: "1",
      shock: "2",
      blight: "0",
      corrosion: "0",
    },
  },
  {
    name: "Realmwalker Gloves",
    description:
      "Ford's gloves were designed for warmth and dexterity. The soldier who wore these was not swinging blades or forging metal. He was pulling triggers and throwing grenades \n  ",
    armor: "3",
    weight: "2",
    resistances: {
      bleed: "0",
      fire: "1",
      shock: "1",
      blight: "1",
      corrosion: "0",
    },
  },
  {
    name: "Red Widow Bracers",
    description:
      "These gloves are light, with openings for the fingers to allow the wearer maximum dexterity - a necesary consideration for traditional Pan weaponry. \n  ",
    armor: "7",
    weight: "5",
    resistances: {
      bleed: "2",
      fire: "0",
      shock: "0",
      blight: "2",
      corrosion: "0",
    },
  },
  {
    name: "Space Worker Gloves",
    description:
      "Electromagnets are worked into the grip, activating automatically when the hand closes. Seems like a useful feature, so long as everything/you work with is metal. \n  ",
    armor: "4",
    weight: "2",
    resistances: {
      bleed: "1",
      fire: "1",
      shock: "1",
      blight: "0",
      corrosion: "1",
    },
  },
  {
    name: "Survivor Gloves",
    description:
      "Made of durable leather and include a makeshift wrist guard consisting of a etalk plate secured by leather straps, providing addition protection to the wearer's wrists withour sacrificing dexterity. \n  ",
    armor: "6",
    weight: "4",
    resistances: {
      bleed: "1",
      fire: "1",
      shock: "1",
      blight: "1",
      corrosion: "1",
    },
  },
  {
    name: "Technician Gloves",
    description: "A tingle runs across your palm within these gloves - like bugs skittering over your hand. \n  ",
    armor: "10",
    weight: "6",
    resistances: {
      bleed: "0",
      fire: "1",
      shock: "2",
      blight: "0",
      corrosion: "1",
    },
  },
  {
    name: "Trainer Bracer",
    description:
      "An arm guard that also functions as a bite sleeve for training on the subtle nuances of when and who to bite. \n  ",
    armor: "7",
    weight: "3",
    resistances: {
      bleed: "2",
      fire: "0",
      shock: "3",
      blight: "1",
      corrosion: "1",
    },
  },
  {
    name: "Labyrinth Gauntlets",
    description:
      "Craggy, uneven stone melds tightly to your hands and forearms, as if the skin of something that once was has at last found new purchase. \n  ",
    armor: "19",
    weight: "10",
    resistances: {
      bleed: "0",
      fire: "3",
      shock: "4",
      blight: "0",
      corrosion: "0",
    },
  },
  {
    name: "Academic's Overcoat",
    description:
      "Donning this uniform makes you feel a touch smarter, and you can't help but straighten the necktie whenever it slips loose. \n  ",
    armor: "37",
    weight: "21",
    resistances: {
      bleed: "2",
      fire: "0",
      shock: "0",
      blight: "3",
      corrosion: "6",
    },
  },
  {
    name: "Bruiser Bodyplate",
    description:
      "This thing is difficult to put on or take off and makes you feel like afwalkipig ta In the thick of battle, that's exactly what you're looking for. \n  ",
    armor: "57",
    weight: "29",
    resistances: {
      bleed: "2",
      fire: "6",
      shock: "0",
      blight: "0",
      corrosion: "2",
    },
  },
  {
    name: "Dendroid Chest",
    description:
      "Fibrous tentacles wrap themselves around your chest. Up until now, you've resolutely avoided this situation. \n  ",
    armor: "23",
    weight: "12",
    resistances: {
      bleed: "4",
      fire: "0",
      shock: "0",
      blight: "2",
      corrosion: "5",
    },
  },
  {
    name: "Elder Raiment",
    description:
      "A distinctive piece of protective gear originating from Yaesha. Its vibrant red color and fur adornments make it stand out, serving as a symbol of the wearer's status and skill. While it may not provide as much protection as some other types of armor, its lightweight construction and flexible design allow for exceptional mobility and ease of movement in combat. \n  ",
    armor: "17",
    weight: "9",
    resistances: {
      bleed: "0",
      fire: "4",
      shock: "0",
      blight: "4",
      corrosion: "2",
    },
  },
  {
    name: "Fae Royal Bodyplate",
    description:
      "The royal guard do not wear insignias on their chests nor crests on their shield. It is assumed their identify is clear from their grab and the confidence with wich they carry themselves. \n  ",
    armor: "57",
    weight: "27",
    resistances: {
      bleed: "4",
      fire: "3",
      shock: "0",
      blight: "2",
      corrosion: "0",
    },
  },
  {
    name: "Field Medic Overcoat",
    description:
      "A long coat over a plate of armor. The metal could be thicker, sure, but your primary concern is safe and speedy travel to the wounded. \n  ",
    armor: "35",
    weight: "16",
    resistances: {
      bleed: "9",
      fire: "0",
      shock: "0",
      blight: "3",
      corrosion: "0",
    },
  },
  {
    name: "High Noon Duds",
    description:
      "A rugged amalgamation of canvas, denim, leather, and steel. These different materials all serve the same purpose of keeping you covered without inhibitin aiming mobility. \n  ",
    armor: "38",
    weight: "19",
    resistances: {
      bleed: "0",
      fire: "4",
      shock: "4",
      blight: "0",
      corrosion: "2",
    },
  },
  {
    name: "Knotted Cage",
    description:
      "Tightly coiled bark shrouds you like a second ribcage. Its embrace is surprisingly-and frighteningly-comforting. \n  ",
    armor: "51",
    weight: "28",
    resistances: {
      bleed: "1",
      fire: "0",
      shock: "0",
      blight: "3",
      corrosion: "7",
    },
  },
  {
    name: "Void Carapace",
    description:
      "Crafted from the same mysterious material as the Void gloves, helm, and greaves, the chest armor completes the set's unsettling aesthetic. Its angular design is both practical and intimidating, providing unparalleled protection against the deadly environments and creatures of Rhom. \n  ",
    armor: "55",
    weight: "28",
    resistances: {
      bleed: "0",
      fire: "3",
      shock: "4",
      blight: "0",
      corrosion: "4",
    },
  },
  {
    name: "Leto Mark II Armor",
    description:
      "A masterpiece of impenetrability. Even though quick maneuvering is near impossible in this metal behemoth, you can't help but be impressed by the ingenuity of the design and the inspired craftsmanship. \n  ",
    armor: "83",
    weight: "44",
    resistances: {
      bleed: "3",
      fire: "4",
      shock: "4",
      blight: "5",
      corrosion: "3",
    },
  },
  {
    name: "Nightstalker Garb",
    description:
      "This old coat is shabby, but who's really looking? The wealth of interior ammunition pockets more than makes up for it. \n  ",
    armor: "34",
    weight: "18",
    resistances: {
      bleed: "2",
      fire: "3",
      shock: "2",
      blight: "2",
      corrosion: "0",
    },
  },
  {
    name: "Radiant Protector",
    description:
      "A dazzling sight, its golden surface featuring a stunning sun burst pattern etched into the chest. Adorned with blue gems embedded in the shoulders this armor is fit for only the most esteemed members of the Laemir \n  ",
    armor: "59",
    weight: "30",
    resistances: {
      bleed: "2",
      fire: "2",
      shock: "4",
      blight: "1",
      corrosion: "0",
    },
  },
  {
    name: "Realmwalker Tunic",
    description:
      "It's not even frayed. How is that possible? Unless the World Stones did the same thing to Ford's clothes as they did to Ford himself. \n  ",
    armor: "21",
    weight: "11",
    resistances: {
      bleed: "3",
      fire: "2",
      shock: "3",
      blight: "4",
      corrosion: "0",
    },
  },
  {
    name: "Red Widow Raiment",
    description:
      "This chestpiece must be hundreds -thousands- of years old, yet it shows no signi of rust or decay. One can only imagine a Pan king or queen wearing such  majestic regalia. \n  ",
    armor: "45",
    weight: "23",
    resistances: {
      bleed: "5",
      fire: "0",
      shock: "0",
      blight: "4",
      corrosion: "1",
    },
  },
  {
    name: "Space Worker Body",
    description:
      "It's made of some material you don't recognize - thick but highly pliable, did the Drzyr expect to get struck by out there? \n  ",
    armor: "22",
    weight: "11",
    resistances: {
      bleed: "1",
      fire: "1",
      shock: "4",
      blight: "0",
      corrosion: "2",
    },
  },
  {
    name: "Survivor Overcoat",
    description:
      "A combination of a sturdy metal chest plate and a worn, leather trench coat that provides some protection against the elements. It's clear that the ari together with practicality in mind, rather than aesthetics. \n  ",
    armor: "36",
    weight: "19",
    resistances: {
      bleed: "3",
      fire: "2",
      shock: "2",
      blight: "2",
      corrosion: "2",
    },
  },
  {
    name: "Technician Bodyplate",
    description:
      "The Xul were engineers and builders, but this armor was made to withstand a grenade blast. Was this built for safety or something else? \n  ",
    armor: "56",
    weight: "30",
    resistances: {
      bleed: "0",
      fire: "2",
      shock: "6",
      blight: "0",
      corrosion: "2",
    },
  },
  {
    name: "Trainer Clothes",
    description:
      "This isn't just any denim jacket, it's your denim jacket. It's not especial pdale. 7 ready, but it's comfortable, and in it you feel ready for anything. y, p If \n  ",
    armor: "36",
    weight: "18",
    resistances: {
      bleed: "3",
      fire: "0",
      shock: "4",
      blight: "1",
      corrosion: "3",
    },
  },
  {
    name: "Labyrinth Mantle",
    description:
      "Though the cloth and tassels possess a seemingly primitive design, the pure energy wracking down your spine reminds you otherwise. \n  ",
    armor: "37",
    weight: "20",
    resistances: {
      bleed: "0",
      fire: "4",
      shock: "6",
      blight: "0",
      corrosion: "0",
    },
  },
  {
    name: "Academic's Trousers",
    description: "Expensive-looking shoes fit for a lecture hall...that wouldn't last a week outsid it. \n  ",
    armor: "17",
    weight: "10",
    resistances: {
      bleed: "2",
      fire: "0",
      shock: "0",
      blight: "1",
      corrosion: "4",
    },
  },
  {
    name: "Bruiser Boots",
    description:
      "While they're not exactly aesthetic, you're more comfortable in twice-temper steel and repurposed tire tread than you care to admit. \n  ",
    armor: "27",
    weight: "15",
    resistances: {
      bleed: "1",
      fire: "4",
      shock: "0",
      blight: "0",
      corrosion: "2",
    },
  },
  {
    name: "Dendroid Leggings",
    description:
      "The deadwood boots are surprisingly snug. You're not sure what you expecte shodding your feet inside the bloodthirsty branches of the Root, but it wasn't this cushioned comfort. \n  ",
    armor: "13",
    weight: "7",
    resistances: {
      bleed: "3",
      fire: "0",
      shock: "2",
      blight: "2",
      corrosion: "0",
    },
  },
  {
    name: "Elder Leggings",
    description:
      "Designed for both form and function. Made from durable yet lightweight materials, they allow for a full range of movement and flexibility in combat. \n  ",
    armor: "12",
    weight: "6",
    resistances: {
      bleed: "0",
      fire: "3",
      shock: "0",
      blight: "2",
      corrosion: "1",
    },
  },
  {
    name: "Fae Royal Greaves",
    description:
      "Although apparently made of steel, they feel lighter than any boots you've eve worn. No... you feel lighter when wearing them. \n  ",
    armor: "25",
    weight: "13",
    resistances: {
      bleed: "2",
      fire: "3",
      shock: "0",
      blight: "2",
      corrosion: "0",
    },
  },
  {
    name: "Field Medic Trousers",
    description:
      "With an assortment of pockets, pouches, and loops for your various concoctioy you're essentially a walking apothecary. \n  ",
    armor: "16",
    weight: "9",
    resistances: {
      bleed: "4",
      fire: "0",
      shock: "0",
      blight: "2",
      corrosion: "0",
    },
  },
  {
    name: "High Noon Soles",
    description:
      "Durable pants with spurred boots and a strip of leather for a belt. The only accent is an imposing skull on the belt buckle, a constant reminder that death is always lurking in the shadows. \n  ",
    armor: "18",
    weight: "10",
    resistances: {
      bleed: "0",
      fire: "3",
      shock: "2",
      blight: "0",
      corrosion: "2",
    },
  },
  {
    name: "Knotted Greaves",
    description:
      "These boots are surprisingly light and agile, carrying you through foliage and bramble with ease. They seem to know where to go before you even lift you foot. \n  ",
    armor: "26",
    weight: "14",
    resistances: {
      bleed: "1",
      fire: "0",
      shock: "0",
      blight: "2",
      corrosion: "4",
    },
  },
  {
    name: "Void Greaves",
    description:
      "A sturdy pair of footwear, expertly crafted from the same unknown material the other Void armor pieces. Their angular design and jagged edges give their wearer an intimidating and fearsome look. But these boots are more than fashion statement-they provided unparalleled protection and stability in the treacherous environments of Rhom. \n  ",
    armor: "26",
    weight: "15",
    resistances: {
      bleed: "0",
      fire: "2",
      shock: "2",
      blight: "0",
      corrosion: "3",
    },
  },
  {
    name: "Leto Mark II Leggings",
    description:
      "Strong yet streamlined. Practical yet aesthetic. Although you can't expect to make a quick getaway in these, they're just what you need to stand strong against the looming threat of destruction. The care and attention to detail t| went into them is something to behold. \n  ",
    armor: "46",
    weight: "23",
    resistances: {
      bleed: "3",
      fire: "2",
      shock: "3",
      blight: "3",
      corrosion: "2",
    },
  },
  {
    name: "Nightstalker Pants",
    description:
      "Thin shoes that fit perfectly and feel like they practically disappear on your feet. They're ideal for stealthy maneuvering while stalking your prey. \n  ",
    armor: "18",
    weight: "9",
    resistances: {
      bleed: "2",
      fire: "2",
      shock: "1",
      blight: "1",
      corrosion: "0",
    },
  },
  {
    name: "Radiant Greaves",
    description:
      "Gleaming golden plates overlap and protect the wearer's feet and shins. Originally designed to be worn by the Pan, it's impressive how the armor can be adapted to fit human proportions without sacrificing its durability or protective properties. \n  ",
    armor: "29",
    weight: "17",
    resistances: {
      bleed: "1",
      fire: "1",
      shock: "3",
      blight: "1",
      corrosion: "0",
    },
  },
  {
    name: "Realmwalker Pantaloons",
    description: "There is hardly a world where these boots haven't tread. \n  ",
    armor: "12",
    weight: "6",
    resistances: {
      bleed: "2",
      fire: "1",
      shock: "2",
      blight: "3",
      corrosion: "0",
    },
  },
  {
    name: "Red Widow Leggings",
    description:
      "Even though this armor was designed to be worn by a Pan warrior, you are still able wear it and benefit from its protection. \n  ",
    armor: "23",
    weight: "12",
    resistances: {
      bleed: "3",
      fire: "0",
      shock: "0",
      blight: "3",
      corrosion: "1",
    },
  },
  {
    name: "Space Worker Legs",
    description:
      "The magnets in the boots are far stronger than those in the gloves. It's unclear how they know when to activate, but they do so on their own. Massive as N'Erud is, it must not provide enough gravity to ensure its workers remain attached to... \n  ",
    armor: "12",
    weight: "7",
    resistances: {
      bleed: "1",
      fire: "1",
      shock: "3",
      blight: "0",
      corrosion: "2",
    },
  },
  {
    name: "Survivor Leggings",
    description:
      "Provides minimal protection, but serve the purpose of covering up skin to prevent minor cuts and scrapes while trekking through rough terrain. \n  ",
    armor: "18",
    weight: "10",
    resistances: {
      bleed: "1",
      fire: "1",
      shock: "1",
      blight: "1",
      corrosion: "2",
    },
  },
  {
    name: "Technician Greaves",
    description:
      "Designed for stability rather than speed. Plant your weight in these things, and you'd be very difficult to move. \n  ",
    armor: "26",
    weight: "14",
    resistances: {
      bleed: "0",
      fire: "1",
      shock: "3",
      blight: "0",
      corrosion: "2",
    },
  },
  {
    name: "Trainer Workboots",
    description:
      "Durable pants that are used to handling more than a little dirt and fur. The canteen is for your companion, while the flask is all yours. \n  ",
    armor: "17",
    weight: "8",
    resistances: {
      bleed: "1",
      fire: "0",
      shock: "1",
      blight: "1",
      corrosion: "2",
    },
  },
  {
    name: "Labyrinth Treads",
    description:
      "The grime of a thousand different worlds mars the side of boots that walk in one place where all paths converge. \n  ",
    armor: "19",
    weight: "10",
    resistances: {
      bleed: "0",
      fire: "3",
      shock: "4",
      blight: "0",
      corrosion: "0",
    },
  },
];
const newModData = [
  {
    name: "Cube Shield",
    description:
      "Cube Shield Generates a Cube Shield which absorbs up to 500 damage from incoming enemy projectiles. Lasts 15s.Reactivating fires the Cube Shield which damages enemies as is travels. Damage is increased if the Cube Shield has absorbed enemy projectile damage before firing. Mod Power Requirement: 1,000",
  },
  {
    name: "Chaos Driver",
    description:
      "Drives electrified rods which tether to other rods within 10m. Tethers deal 20 SHOCK damage per second. Targets embedded with a rod take 20 SHOCK damage per second. They take 20% additionally damage per extra rod in the target. Damage is increased by 1.5% if linked to another rod. Rods in the same target will not link. Mod Power Requirement: 450",
  },
  {
    name: "Explosive Shot",
    description: "Fires an explosive round that deals up to 155 damage within 9m. Mod Power Requirement: 650",
  },
  {
    name: "Screamer",
    description: "Fire a high-powered rocket that deals up to 200 damage within 2.5m. Mod Power Requirement: 400",
  },
  {
    name: "Nano Swarm",
    description:
      " Unleash a swarm of Nanomachines that seek after enemies within 20 meters and repeatedly attack dealing 6 ACID damage per hit. Lasts 15 seconds Mod Power Requirement: 750 ",
  },
  {
    name: "Soul Brand",
    description:
      "Applies a Soul Brand to all enemies within 25m which lasts 25s. Enemies killed while bearing the Soul Brand leave behind an Echo which lasts 10s before returning to the Nightmare Realm. Echoes are drawn to any survivor who walks within 3m, granting 10% of Max Health on contact. Mod Power Requirement: 850",
  },
  {
    name: "Eulogy",
    description:
      "Recalls bots which deal 30 damage when pulled from a target and when striking targets on their return. Recalled bolts grant 2% of Max HP. Recalled bolts can also overfill Sorrow by up to +5. Any additional bolts will be returned to reserves. Mod Power Requirement: 600",
  },
  {
    name: "Big Bang",
    description:
      "Funnels all current Mod Charges into the next shot. Projectiles deal 65 direct damage and 65 Explosive damage in a 5m per Charge consumed. Explosion applies 75 BURNING damage over 10s per Charge consumed. Additional Charges consumed increase all damage by 5%. Max 5 Charges Mod Power Requirement:  630",
  },
  {
    name: "Beta Ray",
    description:
      "Brands a target for 30s. Branded enemies that die leave a Brand at their location.Reloading or Swapping detonates Brands dealing 225 damage.Addiotional Brands (3 Max) on the same target deal 50% damage.Salin enemies return 5-15% of Ammo and Mod power to the weapon.  Mod Power Requirement: 450",
  },
  {
    name: "Supernova",
    description:
      "Fires the compressed remains of a dying star. On contact or hit wit the primary fire, causes Supernova to explode for 150 FIRE Damage, and 350 BURNING Damage over 10s to all targets within 4m.Striking the Supernova with Aphelion's primary fire increases its explosion radius by 25% and damage by 50%, and spawns a massive shockwave that deals 300 FIRE damage and also applies the initial BURNING amount. Mod Power Requirement: 400",
  },
  {
    name: "Moonlight Barrage",
    description:
      "Empowers the Bow for 15s. Arrows apply Moonlight to enemies for 3s. Enemies struck by Crescent Moon while Moonlit release a Moon Essence which returns 1 arrow, heals 5% of Max Health, and grants 15% Fire and Reload Speed for 5s. Basic Shots automatically become Charged Shots. Manually Charged Shots fire two arrows.  Mod Power Requirement: 1,250",
  },
  {
    name: "Ouroboros",
    description:
      "Conjures 3 sword fragments that encircle the wielder for 30s. Performing a Melee Attacks lets loose a Fragment which taints the blood of targets, causing all attacks from Deceit to register as Weaspot hits for a short period of time. Charge Melee attack fires all remaining Fragments at once. Mod Power Requirement: 1,440",
  },
  {
    name: "Bloodline",
    description:
      "Fires a devastating blast which penetrates through all enemies in its path. Deals 120 damage with a 25% Critical damage bonus, and 2x additional stagger. Bloodline daage increases by 50% for each enemy penetrated. Mod Power Requirement: N/A",
  },
  {
    name: "Dreadwalker",
    description:
      "Enter the Nightmare Realm. Nightfall gains infinite Ammo, a 35% Fire Rate increase, 10% Lifesteal, and becomes fully automatic. The wielder becomes significatly harder to hit while moving. Disables other weapons and Skills for the duration, or until Dreadwalker is deactivated. Lasts 10s. Mod Power Requirement: 1,250",
  },
  {
    name: "Heat Sink",
    description:
      "Forces open Plasma Cutter's heat vents dispersing all heat. While active, Plasma Cutter generates 50% less heat, and ramping damage cap is increased to 3x Damage. Overheats automatically when deactivated. Lasts 20s. Mod Power Requirement: 850",
  },
  {
    name: "Healing Shot",
    description:
      "Launches a payload that explodes on contact with allies, healing 30% of their max health. When no ally is struck, payload lays dormant until an ally gets close. Dormant payload lasts 30s, slowly losing healing potency over time. Mod Power Requirement: 600",
  },
  {
    name: "Starfall",
    description:
      "Fires a powerful arrow which deals 30 damage and opens a 7m portal that rains down star fragments. Each fragment deals 50 damage within 4m. Lasts 6s. Mod Power Requirement: 750",
  },
  {
    name: "Guardian's Call",
    description:
      "Calls down a Guardian Sword on enemies struck by an Energy Disc. Swords deal 100 damage and 3x stagger within 5m. Mod Power Requirement: 750",
  },
  {
    name: "Bloodthirst",
    description:
      "Damage increases by +25% against BLEEDING enemies, and +25% when attacking from behind. Charge Attacks deal 100 BLEEDING damage over 10s Mod Power Requirement: N/A",
  },
  {
    name: "Fission Strike",
    description:
      "On Neutral Evade Attacks Atom Splitter achieves Nuclear Fission, releasing a wave of charged particles which deals 151.5 Damage to targets within 10m. Charged Neutral Evade Attacks increase range by 3x and Damage by 25% Mod Power Requirement: N/A",
  },
  {
    name: "Dreamwave",
    description:
      "After dealing 250 damage, Charge Attack will release a Dreamwave, flowing outwards 20m and returning to caster. Dreamwave applies SLOW to all enemies for 10s and grants a Stack of REVERIE for each enemy affected. Each Stack grants +2% to All Damage and +2% Movement Speed, which lasts 15s. Mod Power Requirement: N/A",
  },
  {
    name: "Death Sentence",
    description:
      "Dealing Melee Damage 6 times over 10s empowers Feral Judgement. When empowered, Neutral Backdash Charge Attacks apply Death Sentence. After 1.5s of being sentenced, the enemy will suffer 10 Phantom Strikes, dealing X25 Damage each. Deals 25% additional damage to BLEEDING enemies. Mod Power Requirement: N/A",
  },
  {
    name: "Fracture",
    description:
      "Charge Attacks taint the blood of targets, causing all attacks from Godsplitter to register as Weakspot hits for 3s seconds. Duration increases with additional fragments. Max 35s. Mod Power Requirement: N/A",
  },
  {
    name: "Energy Wave",
    description:
      "Charge attacks use 35 stamina to release an energy wave projectile allowing the wielder to strike enemies from much farther away. Mod Power Requirement: N/A",
  },
  {
    name: "Athibar",
    description:
      "Charge attacks use 25 stamina to throw the spear, which returns to the wielder's hand. Mod Power Requirement: N/A",
  },
  {
    name: "Krell Edge",
    description:
      "Charge to throw the Krell Axe which applies OVERLOAD on hit, dealing 50 SHOCK Damage every 5s for 10s. Shortly after throwing, another will appear in the wielders hand. Costs 25 Stamina Mod Power Requirement: N/A",
  },
  {
    name: "Beyond The Veil",
    description:
      "Neutral Evade turns to mist, granting Nightshade 5% base damage as Lifesteal for 5s. Perfect Dodge doubles duration. Mod Power Requirement: N/A",
  },
  {
    name: "Lifeline",
    description:
      "After dealing 250 damage, the next charge attack causes the spirit of the RED DOE to stampede forward, dealing 160 damage to enemies and regenerating 10% Health to allies in its path. Mod Power Requirement: N/A",
  },
  {
    name: "Whirlwind",
    description:
      "Neutral Backdash Charge creates a Whirlwind of slashes which strike all enemies within 8m for 75 damage. Mod Power Requirement: N/A",
  },
  {
    name: "Faultline",
    description:
      "Charge to fire off ground-based shockwaves which deal 115 damage. Costs 35 Stamina Mod Power Requirement: N/A",
  },
  {
    name: "Astral Burst",
    description:
      "Fires a short range burst of 7 star fragments which deal 35 damage each. Fragments bounce off walls up to 3 times, dealing 35% additional damage per bounce. Weakspot hits deal reduced damage. Mod Power Requirement: 450",
  },
  {
    name: "Blood Draw",
    description:
      "Shoots out razor-sharp Chain Shards which impale up to 5 targets within 15m, dealing 10 damage. On hit, chains are pulled towards the caster, dealing 250 damage split equally among enemies and applying 275 BLEEDING damage over 15s. Mod Power Requirement: 450",
  },
  {
    name: "Bore",
    description:
      "Fires a drill projectile which bores into enemies on contact, dealing 80 damage. After fully burrowing into an enemy, creates a Weakspot which grants 50% of normal Weakspot Damage on hit. If attached to an existing Weakspot, Ranged Crit Chance is increased by 15% when attacking the drill. Lasts 6s. Mod Power Requirement: 500",
  },
  {
    name: "Concussive Shot",
    description:
      "Fires a focused blast of air through all targets within 8m, dealing 155 damage and 5x impact. Mod Power Requirement: 500",
  },
  {
    name: "Corrosive Rounds",
    description:
      "Imbues ammunition with TOXIC and increases Range Crit Chance by 15% for 20s. Shots also apply CORRODED, dealing 100 damage over 10s. Mod Power Requirement: 1250",
  },
  {
    name: "Defrag",
    description:
      "Infects weapon with Malware for 30s, causing shots to apply FRAGMENTED for 5s. When a FRAGMENTED enemy dies, they create a Glitch that lasts 15s.Picking up a Glitch increases All damage by 20% for 15s. Destroying a Glitch causes it to destabilize, creating a 5m Virus Pool which deals 25 damage per second and applies the FRAGMENTED debuff to enemies inside. Virus Pools last 15s. Mod Power Requirement: 1500",
  },
  {
    name: "Energy Wall",
    description:
      "Deploys an energy barrier on impact with ground. Allies can shoot through Energy Wall but enemy projectiles are absorbed (up to 500 damage received). Max 1 Wall at a time. Lasts 30s. Mod Power Requirement: 500",
  },
  {
    name: "Familiar",
    description:
      "Summons Faerie Familiar to aid in combat. The Familiar selects a random enemy within 10m and slashes through them for 25 damage each attack. Familiar will select a new target when the previous one dies. Lasts 15s. Mod Power Requirement: 1,000",
  },
  {
    name: "Fargazer",
    description:
      "Calls forth an eye of Legion to gaze at player's AIM target. For every 0.25s Fargazer focuses on a target within 25m, a stack of MADNESS Status is applied for 5s. Each stack deals 3 Damage per second. Max 10 stacks. Lasts 30s. Mod Power Requirement: 1,250",
  },
  {
    name: "Firestorm",
    description:
      "Creates a whirling cyclone that sucks in nearby targets and applies BURNING for 10s. The center of the cyclone deals 75 FIRE damage per second. Lasts 15s. Mod Power Requirement: 1,250",
  },
  {
    name: "Healing Shot",
    description:
      "Launches a payload that explodes on contact with allies, healing 30% of their max health. When no ally is struck, payload lays dormant until an ally gets close. Dormant payload lasts 30s, slowly losing healing potency over time. Mod Power Requirement: 600",
  },
  {
    name: "Helix",
    description:
      "Shoots a helix of missiles, dealing 120 damage. On contact, divides into 6 smaller rockets which seek additional targets, dealing 30 damage on contact. Mod Power Requirement: 850",
  },
  {
    name: "Hot Shot",
    description:
      "Imbues ammunition with FIRE and increases Ranged damage by 15% for 20s. Shots also apply BURNING, dealing 200 FIRE Damage over 10 seconds. Mod Power Requirement: 1250",
  },
  {
    name: "Overflow",
    description:
      "Imbues ammunition with SHOCK and increases Fire Rate by 15% and Reload Speed by 15% for 20 seconds. Shots also apply OVERLOADED, dealing 35 SHOCK Damage every 5s for 15s. Mod Power Requirement: 1,250",
  },
  {
    name: "Prismatic Driver",
    description:
      "Fires a superheated beam which deals 25 Mod Damage per second. Sustaining the beam on a target causes an explosion which deals 150 Mod damage in a 3m AOE. Mod Power Requirement: 50 per Pulse.",
  },
  {
    name: "Root Blades",
    description:
      "Fires a volley of Root Blades in an arc which each deal 25 Damage and apply 200 BLEEDING damage over 10s Mod Power Requirement: 750",
  },
  {
    name: "Rootlash",
    description:
      "Launches a projectile which summons a Root Tentacle. Tentacles deal 30 damage and steal 1.5% of the hero's Max Health per hit. Lasts 20s. (Max 2) Mod Power Requirement: 450",
  },
  {
    name: "Rotted Arrow",
    description:
      "Fires a rotten arrow that deals 20 damage and detonates for another 60 damage within 4m. A deadly gas cloud is left behind that deals 200 damage over 5s. Mod Power Requirement: 400",
  },
  {
    name: "Scrap Shot",
    description:
      "Fires a caltrops grenade that explodes to cover an area of 6m. Caltrops deal 20 damage per second and SLOW to enemies that walk over them. Lasts 10s. Mod Power Requirement: 750",
  },
  {
    name: "Skewer",
    description:
      "Fires a Wretched Spear which embeds itself on contact. Spears deal 125 damage on hit, rapidly dividing inside the target until bursting, dealing 140 damage to all targets within 3m. Spears embedded in the environment remain in place for 10s. Mod Power Requirement: 850",
  },
  {
    name: "Song of Eafir",
    description:
      "Fires a shot infused with the binding power of the Song of Eafir. Staggers most ground enemies within 10m and deals 150 damage to Flying enemies within the same range.The song continues for 15s, afflicting targets within 15m with SLOW, and a 15% decrease to damage dealt. Mod Power Requirement: 1000",
  },
  {
    name: "Soulbinder",
    description:
      "Fires a projectile that attaches to the enemy dealing 40 damage. Enemies within 7m become bound to the primary target after impact and share 60% of damage dealt to them. Lasts 15s. Mod Power Requirement: 650",
  },
  {
    name: "Space Crabs",
    description:
      "Launch an alien egg that bursts on impact, releasing 5 Space Crabs. Crabs follow the caster, leaping towards enemies within 4m, and exploding, dealing 60 Damage each. Mod Power Requirement: 450",
  },
  {
    name: "Stasis Beam",
    description:
      "Fires a beam which deals 15 damage per second, and applies SLOW Debuff. After 3s of application to a target, SLOW becomes STASIS, freezing the target in place for 10s. Mod Power Requirement: 50 per Pulse.",
  },
  {
    name: "Time Lapse",
    description:
      "Creates a 6m blast which freezes all standard enemies for 7s. Dealing damage to frozen enemies immediately breaks the Time Lapse effect, applying SLOW for the remaining duration. Mod Power Requirement: 1,000",
  },
  {
    name: "Tremor",
    description:
      "Fires a projectile that cracks the ground and spawns shockwaves that deal 75 damage Within 9m for 6s. Shockwaves inflict 3x impact. Mod Power Requirement: 900",
  },
  {
    name: "Voltaic Rondure",
    description:
      "Launches a slow-moving orb that pulses every 0.5s, striking enemies within 3m for 20 SHOCK damage and applying OVERLOADED for 15s. The orb lasts 20s. The orb can be overcharged by striking it with additional damage. Mod Power Requirement: 850",
  },
  {
    name: "Witchfire",
    description:
      "Fires a highly volatile projectile that explodes to leave a line of flaming terrain. Deals 55 FIRE Damage per second, and applies BURNING, dealing 200 damage over 10s. Lasts 5s. Mod Power Requirement: 750",
  },
  {
    name: "Accelerator",
    description:
      "Charge Melee Attacks increase the speed of all Melee Attacks by 10% for 5s. Mod Power Requirement: N/A",
  },
];

const Data = () => {
  let allItems = getAllItems();

  newWeaponData.forEach(item => {
    allItems = allItems.map(i => {
      delete i.subCategories;
      if (slugify(i.name) === slugify(item.name)) {
        return { ...item, ...i };
      }

      return i;
    });
  });

  newArmorData.forEach(item => {
    allItems = allItems.map(i => {
      delete i.subCategories;
      if (slugify(i.name) === slugify(item.name)) {
        return { ...item, ...i };
      }

      return i;
    });
  });

  let lastId = parseInt(allItems.slice(-1)[0].id);
  newModData.forEach(item => {
    const doesExist = allItems.find(i => slugify(i.name) === slugify(item.name));
    if (!doesExist) {
      lastId++;
      item.weaponMod = true;
      item.inTracker = false;
      item.id = lastId;
      item.category = "mods";
      allItems.push(item);
    }
  });

  console.log(allItems);

  return <div></div>;
};

export default Data;
