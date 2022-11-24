module.exports = {
    id: "guildMemberAdd",
    async execute(member) {
        const role = member.guild.roles.cache.find(role => role.id === '1036590132754661437')
        member.roles.add(role)
    }
}

