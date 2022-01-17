export type Skill = {
  level: number;
  experiencePoints: number;
};

export type Skills = {
  id: string;
  skills: {
    "color-light": Skill;
    anatomy: Skill;
    composition: Skill;
    construction: Skill;
    design: Skill;
    gesture: Skill;
    perspective: Skill;
  };
};
