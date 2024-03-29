#!/usr/bin/python

from tkinter import *
from tkinter.filedialog import *
from tkinter.messagebox import *
import os
import subprocess


class GUI:
    def __init__(self):
        top = Tk()
        self.cli = CLI()
        self.createMenuBar(top)
        top.mainloop()

    def createMenuBar(self, root):
        menubar = Menu(root)

        # create a pulldown menu, and add it to the menu bar
        filemenu = Menu(menubar, tearoff=0)
        filemenu.add_command(
            label="Open", command=lambda: askopenfilename(self.file))
        filemenu.add_command(
            label="Save", command=lambda: asksaveasfilename(self.file))
        filemenu.add_separator()
        filemenu.add_command(label="Exit", command=root.quit)
        menubar.add_cascade(label="File", menu=filemenu)

        # create more pulldown menus
        editmenu = Menu(menubar, tearoff=0)
        editmenu.add_command(label="Login", command=lambda: self.cli.login)
        editmenu.add_command(label="Logout", command=lambda: self.cli.logout)
        menubar.add_cascade(label="Edit", menu=editmenu)

        helpmenu = Menu(menubar, tearoff=0)
        message = 'Thank you for using NordVPN, the only trustable no-log vpn.\n\nGUI coded by pusaieth\nhttps://github.com/pusalieth'
        helpmenu.add_command(
            label="About", command=lambda: showinfo('About', message))
        menubar.add_cascade(label="Help", menu=helpmenu)

        # display the menu
        root.config(menu=menubar)


class CLI:
    def login(self, username, password):
        process = subprocess.Popen(
            ["nordvpn", "login"], stdin=subprocess.PIPE, stdout=subprocess.PIPE)
        input = str("%s\n%s\n" % (username, password)).encode('utf-8')
        process.stdin.write(input)
        print(process.communicate()[0])
        process.stdin.close()

    def connect(self, country='', server_num='', double_vpn=False, p2p=False, region='', dedicated=False):
        # example us8704
        manual_server = country_code != '' and server_num != ''
        if (manual_server):
            country_code = '%s%s' % (country, server_num)
        #
        if (double_vpn):
            if(manual_server):
                prefix = '--group double_vpn '
            else:
                prefix = 'double_vpn'
        #
        if(not manual_server and not double_vpn):
            if(p2p):
                prefix = 'P2P'
            elif(dedicated):
                prefix = 'P2P'
            elif(region != ''):
                prefix = region


        return os.popen('nordvpn connect %s%s%s' % (prefix, country_code, server_num)).read()

    def disconnect(self):
        return os.popen('nordvpn disconnect').read()

    def threatprotectionlite(self, state=False):
        return os.popen('nordvpn set threatprotectionlite %s' % 'on' if state else 'off').read()

    def cybersec(self, state=False):
        return os.popen('nordvpn set cybersec %s' % 'on' if state else 'off').read()

    def killswitch(self, state=False):
        return os.popen('nordvpn set killswitch %s' % 'on' if state else 'off').read()

    def autoconnect(self, state=False, country_code='', server_num=''):
        return os.popen('nordvpn set autoconnect %s %s%s' % ('on' if state else 'off', country_code, server_num)).read()

    def notifications(self, state=False):
        return os.popen('nordvpn set notify %s' % 'on' if state else 'off').read()

    def customDNS(self, ip1='1.1.1.1', ip2='1.0.0.1'):
        return os.popen('nordvpn set dns').read()

    def protocol(self, packet_type): # UDP or TCP, pref UDP
        return os.popen('nordvpn set protocol %s' % packet_type).read()

    def obfuscate(self, state=False):
        return os.popen('nordvpn set obfuscate %s' % 'on' if state else 'off').read()

    def connectionType(self, **args): # OpenVPN or NordLynx
        return os.popen('nordvpn set technology %s' % args).read()

    def whitelist(self, command, option, value):
        # command = add, remove
        # option = port, subnet
        # value = integer (port), IP_Address (CIDR)
        return os.popen('nordvpn whitelist %s %s %s' % (command, option, value)).read()

    def accountINFO(self):
        return os.popen('nordvpn account').read()

    def newAccount(self):
        return os.popen('nordvpn register').read()

    def rateLastConnection(self):
        return os.popen('nordvpn rate').read()

    def getSettings(self):
        settings = os.popen('nordvpn settings').read()
        settings_values = self.formatReturn(settings)
        self.settings = {}
        for setting in settings_values:
            key, value = setting.replace(' ', '').split(':')
            self.settings.update({key: value})

    def getStatus(self):
        status = os.popen('nordvpn status').read()
        self.status = self.formatReturn(status)

    def getCountries(self):
        countries = os.popen('nordvpn countries').read()
        self.countries = self.formatReturn(countries)

    def getCities(self, country):
        cities = os.popen('nordvpn cities %s' % country).read()
        self.cities = self.formatReturn(cities)

    def getGroups(self):
        groups = os.popen('nordvpn groups').read()
        self.groups = self.formatReturn(groups)

    def logout(self):
        return os.popen('nordvpn logout').read()

    def help(self):
        returned = os.popen('nordvpn help').read()
        returned = self.formatReturn(returned)
        self.version = returned[1]

    def formatReturn(self, string):
        string = string.replace('\n-\n', '')
        string = string.replace('\t', ',')
        string = string.replace('\n', ',')
        strings = string.split(',')
        formatted = []
        for element in strings:
            if (element != None and element.strip() != ''):
                formatted.append(element)

        return formatted


if __name__ == "__main__":
    CLI()
