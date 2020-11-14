<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="2" class="hidden-sm-and-down" />
        <v-col cols="12" sm="8">
            <v-sheet class="mb-4 pa-2 text-left px-4">
                <h1>The Rules</h1>
                <p>It's a website. Basic "using a website" and "using social media" rules apply. You can probably stop reading here, honestly.</p>
                <p>
                    <strong>Bee Questions</strong> is not for children, so you can say words like "damn" and "barf," and you will likely see those words, too. The main rule
                    is "don't be a jackass." Attempts have been made to prevent ne'er-do-wells from spamming the site with racial slurs, but technology is not perfect. Any
                    attempts to circumvent the built-in censors or come up with creative new ways to be an asshole will result in termination of your posting privileges.
                </p>
                <p>
                    Harassing other users, either directly or indirectly, is absolutely not tolerated and will also be grounds for account termination. While profanity is allowed,
                    excessively crude or vulgar-for-the-sake-of-it posts will be likely deleted and may be grounds for warnings, temporary restrictions, or account termination. 
                    By using <strong>Bee Questions</strong> you agree to use its provided services as intended and accept that violating these rules is grounds for your posts
                    being deleted, your account being temporarily restricted from posting, or your account being banned entirely.
                </p>
                <p>
                    You should probably understand what all that entails at this point, but just to specify in more concrete terms: no racism, sexism, homophobia, transphobia, 
                    ableism, classism, xenophobia, fatphobia, anti-semitism, or abusive content is allowed. Even if you think it's funny. Mistakes happen, and you're not going 
                    to be banned immediately if you unintentionally make a post that violates a rule, but the post may be deleted, you may be warned, etc. Making fun of celebrities
                    and other famous/historical figures is fine. Occasional good faith goofs about other users on the site is also fine, although it'll probably make your joke 
                    less funny to newer users. Harrassing or bullying other users is not allowed. Political and religious content is technically allowed, but most political and 
                    religious humor is only funny to people who agree with you and can make people who disagree with you do a big mad, so use your head when it comes to that 
                    sort of thing.
                </p>
                <p>
                    Still reading? I'm flattered, but really it all just boils down to "don't be an asshole." I know that's vague and the definition of that word varies from 
                    person to person, but at the end of the day, if your goal here is to have fun and make other people laugh, it is highly unlikely that you're going to get into 
                    too much trouble. If you have some ideas on how to improve these rules or have some specific questions about them, 
                    <a href="mailto:fench@hauntedbees.com">maybe just shoot us an email</a>.
                </p>
            </v-sheet>
        </v-col>
        <v-col cols="12" sm="2" class="hidden-sm-and-down" v-if="$store.state.auth">
            <UserInfo />
        </v-col>
    </v-row>
</v-container>
</template>