const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      console.log("decode user:", decoded);
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndLocation = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.locationId === req.params.locationId || 
      req.user.type === "agencyUser"
    ) {
      next();
    } else {
      console.log("user is:", req.user);
      res.status(403).json("location Invalid!");
    }
  });
};

const verifyTokenLocationAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      (req.user.locationId === req.params.locationId &&
        (req.user.id === req.params.userId || req.user.isAdmin)) ||
      req.user.type === "agencyUser"
    ) {
      next();
    } else {
      console.log("user is:", req.user);
      res.status(403).json("You are not Authorized!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndAgency = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.type === "agencyUser") {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAgencyAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.type === "agencyUser" &&
      (req.user.id === req.params.userId || req.user.isAdmin)
    ) {
      next();
    } else {
      console.log("user is:", req.user);
      res.status(403).json("You are not Authorized!");
    }
  });
};

//Chech If user belong to correct location and isAdmin.

//Check If user belong to Agency, In this case User can edit all locations info.

//check If user belong to Agency and is SuperAdmin, In this case He can edit any info in the app.

/* 
const TokenAndAuth = (req, res, next) => {
  TestToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
}; */

/* 
const TokenAndAgencyUser = (req, res, next) => {
  TestToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};
const TokenAndSuperAdmin = (req, res, next) => {
  TestToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
}; */

module.exports = {
  verifyToken,
  verifyTokenAndLocation,
  verifyTokenAndAdmin,
  verifyTokenLocationAndAuth,
  verifyTokenAndAgency,
  verifyTokenAgencyAndAuth,
};
