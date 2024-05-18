class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (
      this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal
    );
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.

  // thanks to Evgheni for helping with this strech method!!
  // helper function
  vampirsAncestor() {
    let ancestors = [];
    ancestors.push(this);
    if (this.creator) {
      ancestors = ancestors.concat(this.creator.vampirsAncestor());
    }
    return ancestors;
  }

  closestCommonAncestor(vampire) {
    const arr1 = this.vampirsAncestor();
    const arr2 = vampire.vampirsAncestor();
    let result = arr1.filter((element) => {
      if (arr2.indexOf(element) !== -1) {
        return element;
      }
    });
    return result[0];
  }

  // return vampire object with given name
  vampireWithName(name) {
    if (this.name === name) return this;
    for (const descendent of this.offspring) {
      const found = descendent.vampireWithName(name);
      if (found) return found;
    }
    return null;
  }

  // return the number of descendents
  get totalDescendents() {
    let descendents = 0;
    descendents += this.offspring.length;
    for (const descendent of this.offspring) {
      descendents += descendent.totalDescendents;
    }
    return descendents;
  }

  // return array of vampires created after 1980
  get allMillennialVampires() {
    let millennialVampires = [];
    if (this.yearConverted > 1980) {
      millennialVampires.push(this);
    }
    for (const descendent of this.offspring) {
      millennialVampires = millennialVampires.concat(
        descendent.allMillennialVampires
      );
    }
    return millennialVampires;
  }
}
module.exports = Vampire;
