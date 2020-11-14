<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="2" class="hidden-sm-and-down" />
        <v-col cols="12" sm="8">
            <v-sheet class="mb-4 pa-2 text-left px-4">
                <h1>Privacy Policy</h1>
                <h4 class="mb-6">Last updated November 10, 2020</h4>
                <p>
                    You know how these go. We'll try to make this short because we don't really do anything insidious and we aren't big enough for you to sue us anyway.
                    Haunted Bees Productions ("we", "us", "our") care about privacy; even yours! If you have any questions or concerns about this policy, contact us at 
                    <a href="mailto:privacy@hauntedbees.com">privacy@hauntedbees.com</a>. When you visit our website <a href="https://www.hauntedbees.com/" target="_blank">https://www.hauntedbees.com/</a> or use any of our services (including the website),
                    we collect as little data as possible to perform minimal analytics and allow you to interact with our services.
                </p>
                <p>
                    <strong>Human-Readable and Concise Summary:</strong> We don't use any third-party analytics, we don't serve advertisements, we don't use cookies, and 
                    we don't sell or share any information with anyone. We only collect basic info provided by your browser unless you use one of our services that involves
                    you giving us very clearly defined information (like submitting feedback, creating an account with your email address, etc.). If you do that, we collect
                    that information, too. You can request your data be deleted at any time.  
                </p>

                <h2 class="mb-2 mt-6">What information do we collect?</h2>
                <p>
                    We collect basic information provided by your browser (IP address, browser version, approximate location, ISP). If you use one of our services that 
                    involves authentication, we also collect the credentials and content you provide us.
                </p>
                <p><strong>Personal Information Provided by You.</strong> We collect email addresses, passwords, and any content you provide us with through our services.</p>
                <p><strong>Third-Party Login Data.</strong> Some services may allow you to register with us using third-party accounts, such as social media accounts. If you 
                register this way, we will collect the Information described below in the <strong>How do we handle Social Logins?</strong> section.</p>

                <h2 class="my-2">How do we use your Information?</h2>
                <p>
                    We barely do. Basic browsing information is logged in a self-hosted <ax href="https://awstats.sourceforge.io/">AWStats</ax> instance and never 
                    shared with anyone. Otherwise, everything we collect is opt-in, like:
                </p>
                <ul style="list-style-type: disc" class="mx-10 mb-5">
                    <li>
                        <strong>Account Creation and Management: </strong> If you use a third-party service to register with us, we collect that information (see the 
                        <strong>How do we handle Social Logins?</strong> section below). Otherwise, we collect whatever email address and password you give us.
                    </li>
                    <li>
                        <strong>User Communications: </strong> If you submit feedback to us, we collect that feedback. If you interact with one of our services (posting a 
                        comment, liking a post, flagging a message), we collect that. Other users may be able to see this information, but they will never see your email 
                        address or password.
                    </li>
                </ul>

                <h2 class="my-2">Will your Information be shared with anyone?</h2>
                <p>No.</p>
                <p>But if you post a comment on a post or perform some similar action, that comment will be visible on that post. Aside from that sort of obvious "if you 
                explicitly perform an action to show some information to other users" context, we don't share your information. Unless a government forces us to, in which case,
                we'll share everything we're required to, which still won't be much because we don't collect much.</p>

                <h2 class="my-2">Do we use cookies or tracking technologies?</h2>
                <p>No.</p>

                <h2 class="my-2">How do we handle Social Logins?</h2>
                <p>
                    If you choose to register or log in with a third party account, such as a social media account, we will collect the minimal amount of data provided by
                    their authentication service and nothing else. We will not share this information with anyone, and we will not store anything more than what is needed to 
                    perform our services (even if a social media login tells us a user ID, full name, profile picture, and gender, we'll only store the user ID). We will not 
                    post on any of your social media accounts.
                </p>

                <h2 class="my-2">How long do we keep your Information?</h2>
                <p>We'll keep your account information as long as you keep your account open with us. Basic analytics information is purged manually on an irregular basis.</p>

                <h2 class="my-2">How do we keep your Information safe?</h2>
                <p>
                    We encrypt all passwords. We cannot guarantee that your data is 100% safe from hackers and unauthorized logins, so you probably shouldn't use the same
                    password here as you use for your bank account, and you probably shouldn't send us feedback that contains your credit card numbers.
                </p>

                <h2 class="my-2">Do we collect Information from minors?</h2>
                <p>
                    We do not solicit data from children under 18 years of age. By using our Services aside from basic website browsing, you represent that you are at least 
                    18 or are the parent or guardian of a minor and consent to the minor's use of our Services. If we are informed of data stored on our website about a minor's 
                    personal information, we will promptly delete the data. If you are aware of any data we may have collected from children under the age of 18, please contact 
                    us at <a href="mailto:privacy@hauntedbees.com">privacy@hauntedbees.com</a>.
                </p>

                <h2 class="my-2">What are your Privacy Rights?</h2>
                <p>
                    In some regions, you have certain rights under applicable data protection laws. However, we provide such rights (such as the right to request a copy of your 
                    personal information, the right to request data correction or removal, and the right to restrict processing of your personal information) to any users of our 
                    Services. Just contact us at <a href="mailto:privacy@hauntedbees.com">privacy@hauntedbees.com</a> with what you want.
                </p>
            </v-sheet>
        </v-col>
        <v-col cols="12" sm="2" class="hidden-sm-and-down" v-if="$store.state.auth">
            <UserInfo />
        </v-col>
    </v-row>
</v-container>
</template>