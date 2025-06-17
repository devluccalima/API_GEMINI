interface UpsertCategory {
  name: string;
  description?: string;
}

type SimplifiedTemplate = {
  id: string;
  title: string;
  content: string;
};

type SimplifiedCategory = {
  id: string;
  name: string;
  description?: string;
  templates: SimplifiedTemplate[];
};

export { UpsertCategory, SimplifiedCategory, SimplifiedTemplate };