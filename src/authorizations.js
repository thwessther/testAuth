const isEmpty = (obj) =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;

const intersection = (...arrays) =>
  arrays.reduce((a, b) => a.filter((c) => b.includes(c)));

const difference = (...arrays) =>
  arrays.reduce((a, b) => a.filter((c) => !b.includes(c)));

function checkAuth(requested, provided, strict = false) {
  if (strict === true) {
    return isEmpty(difference(requested, provided));
  }
  return !isEmpty(intersection(requested, provided));
}

function isAuthorized(user, config) {
  if (!user) {
    return false;
  }

  if (!isEmpty(config.countries)) {
    if (!checkAuth(config.countries, user.countryId, false)) {
      return false;
    }
  }

  if (!isEmpty(config.roles)) {
    const roles = Array.isArray(config.roles) ? config.roles : [config.roles];

    if (checkAuth(roles, user.roles, config.strict)) {
      if (!isEmpty(config.scopes)) {
        const scopes = Array.isArray(config.scopes)
          ? config.scopes
          : [config.scopes];

        return checkAuth(scopes, user.scopes, config.strict);
      }
      return true;
    }
    return false;
  }
  if (!isEmpty(config.scopes)) {
    const scopes = Array.isArray(config.scopes)
      ? config.scopes
      : [config.scopes];

    return checkAuth(scopes, user.scopes, config.strict);
  }

  return true;
}

module.exports = {
  isAuthorized
};
