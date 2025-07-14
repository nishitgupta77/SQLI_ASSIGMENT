export type Pet = {
  id: number;
  name: string;
};

export class PetNameCounter {
  private pets: Pet[];

  constructor(pets: Pet[]) {
    this.pets = pets;
  }

  countNames(): Record<string, number> {
    const nameCount: Record<string, number> = {};
    for (const pet of this.pets) {
      const name = pet.name;
      if (name) {
        nameCount[name] = (nameCount[name] || 0) + 1;
      }
    }
    return nameCount;
  }
}
