
//Temporary function for use in future, these are not of any work for now


/* Register New number tiwlio */

router.post("/:locationId/phone-numbers", verifyTokenAndLocation, async (req, res) => {
    try {
      const locationId = req.params.locationId;
      const phoneNumber = await client.incomingPhoneNumbers.create({
        friendlyName: req.body.friendlyName,
        smsUrl: `${req.headers.origin}/api/twilio/${locationId}/sms`, // Set SMS webhook URL
        voiceUrl: `${req.headers.origin}/api/twilio/${locationId}/voice`, // Set Voice webhook URL
        statusCallback: `${req.headers.origin}/api/twilio/${locationId}/status`, // Set Status Callback URL
      });
  
      // Save the phone number details to the database
      const newPhoneNumber = new PhoneNumber({
        locationId,
        phoneNumber: phoneNumber.phoneNumber,
        sid: phoneNumber.sid,
        friendlyName: phoneNumber.friendlyName,
      });
      const savedPhoneNumber = await newPhoneNumber.save();
  
      res.status(201).json(savedPhoneNumber);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
  /* List all phone numbers */

  router.get("/:locationId/phone-numbers", verifyTokenAndLocation, async (req, res) => {
    try {
      const locationId = req.params.locationId;
  
      // Retrieve all phone numbers associated with the location
      const phoneNumbers = await PhoneNumber.find({ locationId });
  
      res.status(200).json(phoneNumbers);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
  /* Handle Incomming Messages */

  router.post("/:locationId/sms", async (req, res) => {
    try {
      const locationId = req.params.locationId;
      const { From, To, Body } = req.body;
  
      // Find the contact associated with the phone number
      const contact = await Contact.findOne({ phone: From, locationId });
  
      if (contact) {
        // Do something with the incoming SMS message
        console.log(`Received SMS from ${From}: ${Body}`);
      }
  
      // Send a response back to the sender
      const twiml = new MessagingResponse();
      twiml.message("Thank you for your message!");
  
      res.set("Content-Type", "text/xml");
      res.send(twiml.toString());
    } catch (err) {
      res.status(500).json(err);
    }
  });
  