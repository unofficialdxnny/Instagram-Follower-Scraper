const fs = require('fs');
const http = require('http');
const { IgApiClient } = require('instagram-private-api');

const ig = new IgApiClient();

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const start = new Date();
const curr = new Date().toISOString();

async function wait_for_internet_connection() {
  while (true) {
    try {
      await http.get('http://ku.edu.np');
      return;
    } catch {
      console.log('No internet connection.\nTrying after 5 seconds.\n');
      await wait(5000);
    }
  }
}

// wait_for_internet_connection();

const accounts = fs.readFileSync('input.txt', 'utf-8').split('\n');
let last = fs.readFileSync('last.txt', 'utf-8').trim();
console.log('Last account scraped was:', last);

for (let i = 0; i < accounts.length; i++) {
  const profile = accounts[i];
  if (last === profile && last.length > 2) {
    console.log(last, profile);
    accounts.splice(i, 1);
    i--;
  }
}

console.log('Resuming from:', accounts[0]);
const PROFILE = accounts.slice();
console.log(PROFILE);
console.log('Total accounts:', PROFILE.length);

async function getFollowers(profile) {
  try {
    console.log('\n\nGetting followers from', profile);
    const filename = 'downloads/' + profile + '.csv';
    fs.appendFileSync(filename, 'user_id,username,fullname,is_verified,is_private,media_count,follower_count,following_count,bio,website,emails,last_activity,scrape_of,scraped_at\n', {
      encoding: 'utf-8'
    });

    await ig.login('your_username', 'your_password');

    const profileData = await ig.user.searchExact(profile);
    const mainFollowers = profileData.follower_count;
    let count = 0;
    let total = 0;

    const followersFeed = ig.feed.accountFollowers(profileData.pk);
    do {
      const followers = await followersFeed.items();
      for (const person of followers) {
        try {
          total++;
          const user_id = person.pk;
          const username = person.username;
          const fullname = person.full_name;
          const is_verified = person.is_verified;
          const is_private = person.is_private;
          const media_count = person.media_count;
          const follower_count = person.follower_count;
          const following_count = person.following_count;
          const bio = person.biography;
          const website = person.external_url;
          const emails = bio.match(/[a-z0-9.\-+_]+@[a-z0-9.\-+_]+\.[a-z]+/g) || [];
          const last_activity = '';

          console.log('Username:', username);
          console.log('Last Activity', last_activity);
          fs.appendFileSync(filename, `${user_id},${username},${fullname},${is_verified},${is_private},${media_count},${follower_count},${following_count},${bio},${website},${emails},${last_activity},${profile},${curr}\n`, {
            encoding: 'utf-8'
          });

          console.log('--------------------------------------------------------------------------------\nTotal followers scraped:', total, ' out of', mainFollowers);
          console.log('Time:', new Date() - start);
          console.log('Current Account:', PROFILE.indexOf(profile) + 1, '\t Remaining Accounts:', PROFILE.length - PROFILE.indexOf(profile) - 1, '\nAccount Name:', profile);
        } catch (error) {
          console.log(error);
        }
      }

      await wait(3000); // Wait for 3 seconds before fetching the next batch of followers
    } while (followersFeed.isMoreAvailable());

    fs.writeFileSync('last.txt', profile);
    fs.appendFileSync('completed.txt', profile + '\n', {
      encoding: 'utf-8'
    });
  } catch (error) {
    console.log('Skipping', profile);
  }
}

async function scrapeFollowers() {
  for (const profile of PROFILE) {
    await getFollowers(profile);
  }
}

scrapeFollowers();
const fs = require('fs');
const http = require('http');
const { IgApiClient } = require('instagram-private-api');

const ig = new IgApiClient();

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const start = new Date();
const curr = new Date().toISOString();

async function wait_for_internet_connection() {
  while (true) {
    try {
      await http.get('http://ku.edu.np');
      return;
    } catch {
      console.log('No internet connection.\nTrying after 5 seconds.\n');
      await wait(5000);
    }
  }
}

// wait_for_internet_connection();

const accounts = fs.readFileSync('input.txt', 'utf-8').split('\n');
let last = fs.readFileSync('last.txt', 'utf-8').trim();
console.log('Last account scraped was:', last);

for (let i = 0; i < accounts.length; i++) {
  const profile = accounts[i];
  if (last === profile && last.length > 2) {
    console.log(last, profile);
    accounts.splice(i, 1);
    i--;
  }
}

console.log('Resuming from:', accounts[0]);
const PROFILE = accounts.slice();
console.log(PROFILE);
console.log('Total accounts:', PROFILE.length);

async function getFollowers(profile) {
  try {
    console.log('\n\nGetting followers from', profile);
    const filename = 'downloads/' + profile + '.csv';
    fs.appendFileSync(filename, 'user_id,username,fullname,is_verified,is_private,media_count,follower_count,following_count,bio,website,emails,last_activity,scrape_of,scraped_at\n', {
      encoding: 'utf-8'
    });

    await ig.login('your_username', 'your_password');

    const profileData = await ig.user.searchExact(profile);
    const mainFollowers = profileData.follower_count;
    let count = 0;
    let total = 0;

    const followersFeed = ig.feed.accountFollowers(profileData.pk);
    do {
      const followers = await followersFeed.items();
      for (const person of followers) {
        try {
          total++;
          const user_id = person.pk;
          const username = person.username;
          const fullname = person.full_name;
          const is_verified = person.is_verified;
          const is_private = person.is_private;
          const media_count = person.media_count;
          const follower_count = person.follower_count;
          const following_count = person.following_count;
          const bio = person.biography;
          const website = person.external_url;
          const emails = bio.match(/[a-z0-9.\-+_]+@[a-z0-9.\-+_]+\.[a-z]+/g) || [];
          const last_activity = '';

          console.log('Username:', username);
          console.log('Last Activity', last_activity);
          fs.appendFileSync(filename, `${user_id},${username},${fullname},${is_verified},${is_private},${media_count},${follower_count},${following_count},${bio},${website},${emails},${last_activity},${profile},${curr}\n`, {
            encoding: 'utf-8'
          });

          console.log('--------------------------------------------------------------------------------\nTotal followers scraped:', total, ' out of', mainFollowers);
          console.log('Time:', new Date() - start);
          console.log('Current Account:', PROFILE.indexOf(profile) + 1, '\t Remaining Accounts:', PROFILE.length - PROFILE.indexOf(profile) - 1, '\nAccount Name:', profile);
        } catch (error) {
          console.log(error);
        }
      }

      await wait(3000); // Wait for 3 seconds before fetching the next batch of followers
    } while (followersFeed.isMoreAvailable());

    fs.writeFileSync('last.txt', profile);
    fs.appendFileSync('completed.txt', profile + '\n', {
      encoding: 'utf-8'
    });
  } catch (error) {
    console.log('Skipping', profile);
  }
}

async function scrapeFollowers() {
  for (const profile of PROFILE) {
    await getFollowers(profile);
  }
}

scrapeFollowers();
