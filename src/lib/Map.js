export class Resource {
  constructor(attrs) {
    this.pattern = attrs.pattern;
    this.component = attrs.component;
  }

  test(url) {
    return this.pattern.test(url);
  }
}

export class Map {
  static draw(resourcesAttrs) {
    const resources = resourcesAttrs.map((resourcesAttrs) => {
      return new Resource(resourcesAttrs)
    });

    return new Map(resources);
  }

  constructor(resources) {
    this.resources = resources;
  }

  find(url) {
    return this.resources.find(r => r.test(url));
  }

  findComponentOrDefault(url, defaultComponent) {
    const resource = this.find(url);
    return (resource) ? resource.component : defaultComponent;
  }
}
