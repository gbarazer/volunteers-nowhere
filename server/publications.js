import { check, Match } from 'meteor/check'
import { MeteorProfile, Volunteers } from '../both/init'

/*  managers, leads and the user itself is authorized to see the picture. */
Meteor.publish('meteor-user-profiles.ProfilePictures', function publishProfilePictures(userId = this.userId) {
  check(userId, Match.Maybe(String))
  const authUserId = userId || this.userId
  if (authUserId === userId || // the user asking for its picture
    Volunteers.isManager() || // manager or admin asking
    Volunteers.isLead()) { // a lead or metalead asking
    return MeteorProfile.ProfilePictures.find({ userId }).cursor
  }
  return null
})
